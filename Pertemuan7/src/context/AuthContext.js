import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { signIn, signOut as signOutService, restoreSession } from '../services/authService';
import { createSampleProducts } from '../services/productService';
import { STORAGE_KEYS, readList } from '../services/storage';

const STATUS = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(STATUS.LOADING);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const restored = await restoreSession();
        if (cancelled) return;
        setUser(restored);
        setStatus(restored ? STATUS.AUTHENTICATED : STATUS.UNAUTHENTICATED);
      } catch {
        if (cancelled) return;
        setUser(null);
        setStatus(STATUS.UNAUTHENTICATED);
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSignIn = useCallback(async (credentials) => {
    const result = await signIn(credentials);

    if (result.isNewAccount) {
      try {
        const existingProducts = await readList(STORAGE_KEYS.PRODUCTS);
        await createSampleProducts(result.user.id, existingProducts);
      } catch {
        // Gagal membuat produk contoh bukan halangan untuk masuk.
      }
    }

    setUser(result.user);
    setStatus(STATUS.AUTHENTICATED);
    return result;
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOutService();
    } finally {
      setUser(null);
      setStatus(STATUS.UNAUTHENTICATED);
    }
  }, []);

  const value = useMemo(
    () => ({ user, status, signIn: handleSignIn, signOut: handleSignOut }),
    [user, status, handleSignIn, handleSignOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus dipakai di dalam AuthProvider.');
  return context;
}

export { STATUS as AUTH_STATUS };
