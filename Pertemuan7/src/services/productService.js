import * as Crypto from 'expo-crypto';
import { SAMPLE_PRODUCTS } from '../constants/categories';
import { STORAGE_KEYS, readList, writeList } from './storage';

function byNewest(a, b) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export async function fetchProducts(ownerId) {
  const products = await readList(STORAGE_KEYS.PRODUCTS);
  return products.filter((product) => product.ownerId === ownerId).sort(byNewest);
}

export async function persistProducts(products) {
  await writeList(STORAGE_KEYS.PRODUCTS, products);
}

export function buildProduct(ownerId, input) {
  return {
    id: Crypto.randomUUID(),
    ownerId,
    name: String(input.name).trim(),
    category: input.category,
    price: Number(input.price),
    stock: Number(input.stock),
    description: String(input.description ?? '').trim(),
    featured: Boolean(input.featured),
    isSample: false,
    createdAt: new Date().toISOString(),
  };
}

/** Produk contoh dibuat sekali saat akun baru, ditandai isSample agar tidak dianggap data asli. */
export async function createSampleProducts(ownerId, existingProducts) {
  const now = Date.now();
  const samples = SAMPLE_PRODUCTS.map((sample, index) => ({
    id: Crypto.randomUUID(),
    ownerId,
    ...sample,
    createdAt: new Date(now - index * 1000).toISOString(),
  }));
  await writeList(STORAGE_KEYS.PRODUCTS, [...existingProducts, ...samples]);
  return samples;
}
