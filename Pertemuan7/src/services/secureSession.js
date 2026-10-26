import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

/**
 * Penyimpanan sesi login.
 *
 * Android/iOS: memakai Keychain (iOS) dan Keystore (Android) lewat
 * expo-secure-store, jadi sesi tidak ikut terbaca dari file aplikasi biasa.
 * WHEN_UNLOCKED_THIS_DEVICE_ONLY dipilih supaya sesi tidak ikut tersinkron
 * ke perangkat lain.
 *
 * Web: Keychain/Keystore tidak tersedia, sesi disimpan di memori sehingga
 * pengguna login ulang setiap kali halaman dimuat ulang.
 */
const SESSION_KEY = 'pertemuan7.session.v1';
const OPTIONS = { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY };

const memoryStore = { serialized: null };

function parse(serialized) {
  if (!serialized) return null;
  try {
    const value = JSON.parse(serialized);
    return value && typeof value === 'object' ? value : null;
  } catch {
    return null;
  }
}

export async function saveSession(session) {
  const serialized = JSON.stringify(session);
  if (Platform.OS === 'web') {
    memoryStore.serialized = serialized;
    return;
  }
  await SecureStore.setItemAsync(SESSION_KEY, serialized, OPTIONS);
}

export async function readSession() {
  if (Platform.OS === 'web') return parse(memoryStore.serialized);
  const serialized = await SecureStore.getItemAsync(SESSION_KEY, OPTIONS);
  return parse(serialized);
}

export async function clearSession() {
  if (Platform.OS === 'web') {
    memoryStore.serialized = null;
    return;
  }
  await SecureStore.deleteItemAsync(SESSION_KEY, OPTIONS);
}
