import { createContext, useContext } from 'react';

export const AppContext = createContext(null);

export function useApp() {
  const value = useContext(AppContext);

  if (!value) {
    throw new Error('useApp harus dipakai di dalam AppProvider.');
  }

  return value;
}
