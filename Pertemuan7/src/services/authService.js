import * as Crypto from 'expo-crypto';
import { normalizeIdentifier } from '../utils/validators';
import { clearSession, readSession, saveSession } from './secureSession';
import { STORAGE_KEYS, readList, writeList } from './storage';

/** Sesi berlaku 30 hari sejak login. */
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

function toHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function randomHex(byteCount) {
  return toHex(await Crypto.getRandomBytesAsync(byteCount));
}

/**
 * Kata sandi tidak pernah disimpan mentah: hanya hash SHA-256 yang sudah
 * dicampur salt acak per pengguna.
 */
async function hashPassword(password, salt) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${password}`);
}

/** Perbandingan berdurasi tetap supaya waktu cek hash tidak membocorkan isi hash. */
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Hanya kunci aman yang boleh sampai ke UI, hash dan salt tetap di penyimpanan. */
function toPublicUser(user) {
  const { salt, passwordHash, ...safe } = user;
  return safe;
}

function deriveShopName(identifier) {
  const base = identifier.includes('@') ? identifier.split('@')[0] : identifier;
  const words = base
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ') || 'Toko Saya';
}

/**
 * Login dengan email atau nama toko plus kata sandi.
 * Akun yang belum ada dibuat otomatis (mode demo luring), akun yang sudah ada
 * kata sandinya diverifikasi.
 */
export async function signIn({ identifier, password }) {
  const key = normalizeIdentifier(identifier);
  const users = await readList(STORAGE_KEYS.USERS);
  const existing = users.find((user) => user.identifier === key);

  let user;
  let isNewAccount = false;

  if (!existing) {
    const salt = await randomHex(16);
    user = {
      id: Crypto.randomUUID(),
      identifier: key,
      shopName: deriveShopName(key),
      email: key.includes('@') ? key : null,
      salt,
      passwordHash: await hashPassword(password, salt),
      createdAt: new Date().toISOString(),
    };
    await writeList(STORAGE_KEYS.USERS, [...users, user]);
    isNewAccount = true;
  } else {
    const candidateHash = await hashPassword(password, existing.salt);
    if (!safeEqual(candidateHash, existing.passwordHash)) {
      throw new Error('Kata sandi salah. Periksa lalu coba lagi.');
    }
    user = existing;
  }

  await saveSession({
    userId: user.id,
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL_MS,
  });

  return { user: toPublicUser(user), isNewAccount };
}

export async function restoreSession() {
  const session = await readSession();
  if (!session) return null;

  if (!session.userId || !session.expiresAt || session.expiresAt < Date.now()) {
    await clearSession();
    return null;
  }

  const users = await readList(STORAGE_KEYS.USERS);
  const user = users.find((item) => item.id === session.userId);
  if (!user) {
    await clearSession();
    return null;
  }
  return toPublicUser(user);
}

export async function signOut() {
  await clearSession();
}
