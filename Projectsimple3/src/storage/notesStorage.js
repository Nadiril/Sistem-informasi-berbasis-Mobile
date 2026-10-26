/**
 * Lapisan penyimpanan lokal catatan (AsyncStorage).
 * Key mengikuti PRD §8: `@notes_app/notes`, nilai berupa JSON.stringify(notes).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import { cardColors } from '../constants/theme';

export const NOTES_STORAGE_KEY = '@notes_app/notes';

/**
 * Samakan struktur catatan lama agar sesuai model data PRD §8.
 * Properti yang hilang (termasuk isFavorite) diberi nilai default aman.
 */
function normalizeNote(raw, index) {
  const now = new Date().toISOString();
  const fallbackColor = cardColors[index % cardColors.length];

  return {
    id:
      typeof raw.id === 'string' && raw.id.length > 0
        ? raw.id
        : `note_${Date.now().toString(36)}_${index}`,
    title: typeof raw.title === 'string' ? raw.title : '',
    content: typeof raw.content === 'string' ? raw.content : '',
    color: typeof raw.color === 'string' && raw.color.length > 0 ? raw.color : fallbackColor,
    isFavorite: raw.isFavorite === true,
    createdAt: typeof raw.createdAt === 'string' && raw.createdAt ? raw.createdAt : now,
    updatedAt: typeof raw.updatedAt === 'string' && raw.updatedAt ? raw.updatedAt : now,
  };
}

/**
 * Baca semua catatan dari penyimpanan.
 * - Jika data tidak ada atau parsing gagal, kembalikan array kosong (aman, tidak crash).
 * - Jika akses penyimpanan gagal, throw error agar bisa ditampilkan ke pengguna (FR-10).
 */
export async function loadNotes() {
  let raw;
  try {
    raw = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
  } catch {
    throw new Error('Penyimpanan perangkat tidak dapat dibaca.');
  }

  if (raw == null) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter((item) => item != null && typeof item === 'object')
      .map(normalizeNote);
  } catch {
    // Parsing rusak: tangani aman agar aplikasi tidak crash (PRD §8).
    return [];
  }
}

/**
 * Tulis seluruh daftar catatan ke penyimpanan.
 * Throw error jika gagal agar pemanggil tidak menampilkan keberhasilan palsu (FR-10).
 */
export async function saveNotes(notes) {
  try {
    await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch {
    throw new Error('Penyimpanan perangkat gagal menulis data.');
  }
}

/** Hapus seluruh data catatan dari penyimpanan. */
export async function clearNotes() {
  try {
    await AsyncStorage.removeItem(NOTES_STORAGE_KEY);
  } catch {
    throw new Error('Penyimpanan perangkat gagal menghapus data.');
  }
}
