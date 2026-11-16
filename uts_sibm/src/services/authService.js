import * as Crypto from 'expo-crypto';

import { createId } from '../utils/id';

const SALT_BYTES = 16;

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function hashPassword(password, salt) {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${salt}:${password}`,
    { encoding: Crypto.CryptoEncoding.HEX },
  );
}

export async function createUserRecord({ name, email, password }) {
  const salt = bytesToHex(await Crypto.getRandomBytesAsync(SALT_BYTES));
  const passwordHash = await hashPassword(password, salt);
  const now = new Date().toISOString();

  return {
    id: createId(),
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    salt,
    passwordHash,
    createdAt: now,
  };
}

export async function verifyUserPassword(user, password) {
  if (!user?.salt || !user?.passwordHash) {
    return false;
  }

  const candidate = await hashPassword(password, user.salt);
  return candidate === user.passwordHash;
}

export function toPublicUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}
