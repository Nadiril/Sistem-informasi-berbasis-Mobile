import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Kunci penyimpanan lokal. Prefiks nama paket supaya tidak bentrok bila
 * kelak ada aplikasi lain di perangkat yang sama.
 */
export const STORAGE_KEYS = {
  USERS: '@pertemuan7/users',
  PRODUCTS: '@pertemuan7/products',
};

/** Baca daftar JSON. Melempar error bila data rusak supaya layar bisa menampilkan status gagal. */
export async function readList(key) {
  const raw = await AsyncStorage.getItem(key);
  if (raw == null) return [];
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error(`Data di ${key} tidak berbentuk daftar.`);
  return parsed;
}

/** Tulis daftar JSON. Melempar error bila gagal, pemanggil yang memutuskan pesan ke pengguna. */
export async function writeList(key, list) {
  await AsyncStorage.setItem(key, JSON.stringify(list));
}
