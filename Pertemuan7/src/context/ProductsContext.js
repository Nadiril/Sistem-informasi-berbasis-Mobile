import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { buildProduct, fetchProducts, persistProducts } from '../services/productService';
import { useAuth } from './AuthContext';

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error',
};

const EMPTY_STATS = { total: 0, featured: 0, outOfStock: 0, stockValue: 0 };

function unavailable() {
  return Promise.reject(new Error('Produk belum tersedia karena belum masuk akun.'));
}

const ProductsContext = createContext(null);

/**
 * Penyedia produk: state dipegang per pemilik akun. Saat akun berganti,
 * komponen diganti sehingga state ikut ter-reset tanpa setter paksa di effect.
 */
export function ProductsProvider({ children }) {
  const { user } = useAuth();
  const ownerId = user?.id ?? null;

  if (!ownerId) {
    return (
      <ProductsContext.Provider value={emptyValue} key="no-owner">
        {children}
      </ProductsContext.Provider>
    );
  }

  return (
    <OwnerProducts ownerId={ownerId} key={ownerId}>
      {children}
    </OwnerProducts>
  );
}

function OwnerProducts({ ownerId, children }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(STATUS.LOADING);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const list = await fetchProducts(ownerId);
        if (cancelled) return;
        setProducts(list);
        setStatus(STATUS.READY);
      } catch {
        if (!cancelled) setStatus(STATUS.ERROR);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [ownerId, reloadToken]);

  const retry = useCallback(() => setReloadToken((token) => token + 1), []);

  const addProduct = useCallback(
    async (input) => {
      const product = buildProduct(ownerId, input);
      const next = [product, ...products];
      await persistProducts(next);
      setProducts(next);
      return product;
    },
    [ownerId, products]
  );

  const toggleFeatured = useCallback(
    async (productId) => {
      const next = products.map((product) =>
        product.id === productId ? { ...product, featured: !product.featured } : product
      );
      await persistProducts(next);
      setProducts(next);
    },
    [products]
  );

  const stats = useMemo(() => {
    const total = products.length;
    const featured = products.filter((product) => product.featured).length;
    const outOfStock = products.filter((product) => product.stock === 0).length;
    const stockValue = products.reduce(
      (sum, product) => sum + (Number(product.price) || 0) * (Number(product.stock) || 0),
      0
    );
    return { total, featured, outOfStock, stockValue };
  }, [products]);

  const value = useMemo(
    () => ({ products, status, stats, addProduct, toggleFeatured, retry }),
    [products, status, stats, addProduct, toggleFeatured, retry]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

const emptyValue = {
  products: [],
  status: STATUS.IDLE,
  stats: EMPTY_STATS,
  addProduct: unavailable,
  toggleFeatured: unavailable,
  retry: unavailable,
};

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts harus dipakai di dalam ProductsProvider.');
  return context;
}

export { STATUS as PRODUCTS_STATUS };
