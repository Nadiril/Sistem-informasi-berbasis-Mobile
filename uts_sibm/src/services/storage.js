import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_CATEGORY_DEFINITIONS, CATEGORY_ICON_NAMES } from '../constants/categories';
import { createId } from '../utils/id';

export const STORAGE_KEYS = Object.freeze({
  users: 'users',
  currentUser: 'currentUser',
  transactions: 'transactions',
  categories: 'categories',
});

export class StorageError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'StorageError';
    this.cause = cause;
  }
}

function parseStoredJson(rawValue, key, fallback) {
  if (rawValue == null) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    throw new StorageError(
      `Data ${key} tidak dapat dibaca. Penyimpanan lokal mungkin rusak.`,
      error,
    );
  }
}

export async function loadStoredData() {
  try {
    const storedEntries = await AsyncStorage.multiGet(Object.values(STORAGE_KEYS));
    const stored = Object.fromEntries(storedEntries);

    return {
      users: parseStoredJson(stored[STORAGE_KEYS.users], STORAGE_KEYS.users, []),
      currentUser: parseStoredJson(
        stored[STORAGE_KEYS.currentUser],
        STORAGE_KEYS.currentUser,
        null,
      ),
      transactions: parseStoredJson(
        stored[STORAGE_KEYS.transactions],
        STORAGE_KEYS.transactions,
        [],
      ),
      categories: parseStoredJson(
        stored[STORAGE_KEYS.categories],
        STORAGE_KEYS.categories,
        [],
      ),
    };
  } catch (error) {
    if (error instanceof StorageError) {
      throw error;
    }

    throw new StorageError('Penyimpanan lokal tidak dapat dibaca.', error);
  }
}

async function writeEntry(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

async function writeEntries(entries) {
  await AsyncStorage.multiSet(
    entries.map(([key, value]) => [key, JSON.stringify(value)]),
  );
}

export async function saveSession(currentUser) {
  await writeEntry(STORAGE_KEYS.currentUser, currentUser);
}

export async function saveUsers(users) {
  await writeEntry(STORAGE_KEYS.users, users);
}

export async function saveRegistration({ users, currentUser, categories }) {
  await writeEntries([
    [STORAGE_KEYS.users, users],
    [STORAGE_KEYS.currentUser, currentUser],
    [STORAGE_KEYS.categories, categories],
  ]);
}

export async function saveTransactions(transactions) {
  await writeEntry(STORAGE_KEYS.transactions, transactions);
}

export async function saveCategories(categories) {
  await writeEntry(STORAGE_KEYS.categories, categories);
}

export async function saveTransactionsAndCategories(transactions, categories) {
  await writeEntries([
    [STORAGE_KEYS.transactions, transactions],
    [STORAGE_KEYS.categories, categories],
  ]);
}

export function createDefaultCategoriesForUser(userId) {
  const now = new Date().toISOString();

  return DEFAULT_CATEGORY_DEFINITIONS.map((definition) => ({
    id: createId(),
    userId,
    name: definition.name,
    type: definition.type,
    icon: CATEGORY_ICON_NAMES.includes(definition.icon)
      ? definition.icon
      : 'dots-horizontal-circle-outline',
    createdAt: now,
    updatedAt: now,
  }));
}

export function isTransactionRecord(transaction) {
  return Boolean(
    transaction &&
      typeof transaction.id === 'string' &&
      typeof transaction.userId === 'string' &&
      (transaction.type === 'income' || transaction.type === 'expense') &&
      Number.isFinite(Number(transaction.amount)) &&
      Number(transaction.amount) > 0 &&
      typeof transaction.categoryId === 'string' &&
      typeof transaction.note === 'string' &&
      typeof transaction.date === 'string',
  );
}

export function isCategoryRecord(category) {
  return Boolean(
    category &&
      typeof category.id === 'string' &&
      typeof category.userId === 'string' &&
      (category.type === 'income' || category.type === 'expense') &&
      typeof category.name === 'string' &&
      typeof category.icon === 'string',
  );
}

export function isUserRecord(user) {
  return Boolean(
    user &&
      typeof user.id === 'string' &&
      typeof user.email === 'string' &&
      typeof user.passwordHash === 'string' &&
      typeof user.salt === 'string',
  );
}
