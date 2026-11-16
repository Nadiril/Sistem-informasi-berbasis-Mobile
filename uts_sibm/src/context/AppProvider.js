import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';

import { CATEGORY_ICON_NAMES } from '../constants/categories';
import { createUserRecord, toPublicUser, verifyUserPassword } from '../services/authService';
import {
  createDefaultCategoriesForUser,
  isCategoryRecord,
  isTransactionRecord,
  isUserRecord,
  loadStoredData,
  saveCategories,
  saveRegistration,
  saveSession,
  saveTransactions,
  saveTransactionsAndCategories,
} from '../services/storage';
import { createId } from '../utils/id';
import {
  normalizeEmail,
  validateCategoryDraft,
  validateEmail,
  validateName,
  validatePassword,
  validateTransactionDraft,
} from '../utils/validation';
import { AppContext } from './AppContext';

const initialState = {
  phase: 'loading',
  startupError: null,
  users: [],
  currentUser: null,
  transactions: [],
  categories: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE_START':
      return { ...state, phase: 'loading', startupError: null };
    case 'HYDRATE_SUCCESS':
      return {
        ...state,
        phase: 'ready',
        startupError: null,
        users: action.payload.users,
        currentUser: action.payload.currentUser,
        transactions: action.payload.transactions,
        categories: action.payload.categories,
      };
    case 'HYDRATE_ERROR':
      return { ...state, phase: 'error', startupError: action.payload };
    case 'SET_SESSION':
      return { ...state, currentUser: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_FINANCE':
      return {
        ...state,
        transactions: action.payload.transactions,
        categories: action.payload.categories,
      };
    default:
      return state;
  }
}

function getActionErrorMessage(error) {
  console.error(error);
  return 'Perubahan belum dapat disimpan. Coba lagi.';
}

function getCategoryFallbackName(category) {
  return category?.name || 'kategori lain';
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const hydrate = useCallback(async () => {
    dispatch({ type: 'HYDRATE_START' });

    try {
      const stored = await loadStoredData();
      const users = Array.isArray(stored.users)
        ? stored.users.filter(isUserRecord)
        : [];
      const userIds = new Set(users.map((user) => user.id));
      const validUserTransactions = Array.isArray(stored.transactions)
        ? stored.transactions
            .filter(isTransactionRecord)
            .filter((transaction) => userIds.has(transaction.userId))
        : [];
      let categories = Array.isArray(stored.categories)
        ? stored.categories
            .filter(isCategoryRecord)
            .filter((category) => userIds.has(category.userId))
        : [];
      let categoriesChanged = false;

      users.forEach((user) => {
        const hasCategories = categories.some((category) => category.userId === user.id);

        if (!hasCategories) {
          categories = [...categories, ...createDefaultCategoriesForUser(user.id)];
          categoriesChanged = true;
        }
      });

      const sessionUser = users.find((user) => user.id === stored.currentUser?.id) || null;
      const currentUser = toPublicUser(sessionUser);

      if (categoriesChanged) {
        await saveCategories(categories);
      }

      if (stored.currentUser && !sessionUser) {
        await saveSession(null);
      }

      dispatch({
        type: 'HYDRATE_SUCCESS',
        payload: {
          users,
          currentUser,
          transactions: validUserTransactions,
          categories,
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'HYDRATE_ERROR',
        payload:
          error?.message ||
          'Penyimpanan lokal tidak dapat dibaca. Tutup lalu buka kembali aplikasi.',
      });
    }
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const register = useCallback(async ({ name, email, password }) => {
    const current = stateRef.current;
    const fieldErrors = {};
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError) {
      fieldErrors.name = nameError;
    }

    if (emailError) {
      fieldErrors.email = emailError;
    }

    if (passwordError) {
      fieldErrors.password = passwordError;
    }

    const normalizedEmail = normalizeEmail(email);

    if (
      !fieldErrors.email &&
      current.users.some((user) => normalizeEmail(user.email) === normalizedEmail)
    ) {
      fieldErrors.email = 'Email sudah terdaftar.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return {
        ok: false,
        error: 'Periksa kembali data pendaftaran.',
        fieldErrors,
      };
    }

    try {
      const userRecord = await createUserRecord({
        name,
        email: normalizedEmail,
        password,
      });
      const nextUsers = [...current.users, userRecord];
      const nextCategories = [
        ...current.categories,
        ...createDefaultCategoriesForUser(userRecord.id),
      ];
      const publicUser = toPublicUser(userRecord);

      await saveRegistration({
        users: nextUsers,
        currentUser: publicUser,
        categories: nextCategories,
      });

      dispatch({ type: 'SET_USERS', payload: nextUsers });
      dispatch({ type: 'SET_CATEGORIES', payload: nextCategories });
      dispatch({ type: 'SET_SESSION', payload: publicUser });

      return { ok: true };
    } catch (error) {
      return { ok: false, error: getActionErrorMessage(error) };
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const current = stateRef.current;
    const fieldErrors = {};
    const emailError = validateEmail(email);

    if (emailError) {
      fieldErrors.email = emailError;
    }

    if (!String(password ?? '')) {
      fieldErrors.password = 'Password wajib diisi.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return { ok: false, error: 'Email dan password wajib diisi.', fieldErrors };
    }

    const userRecord = current.users.find(
      (user) => normalizeEmail(user.email) === normalizeEmail(email),
    );

    if (!userRecord) {
      return { ok: false, error: 'Email atau password salah.' };
    }

    try {
      const passwordMatches = await verifyUserPassword(userRecord, password);

      if (!passwordMatches) {
        return { ok: false, error: 'Email atau password salah.' };
      }

      const publicUser = toPublicUser(userRecord);
      await saveSession(publicUser);
      dispatch({ type: 'SET_SESSION', payload: publicUser });

      return { ok: true };
    } catch (error) {
      return { ok: false, error: getActionErrorMessage(error) };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await saveSession(null);
      dispatch({ type: 'SET_SESSION', payload: null });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: getActionErrorMessage(error) };
    }
  }, []);

  const addTransaction = useCallback(async (draft) => {
    const current = stateRef.current;

    if (!current.currentUser) {
      return { ok: false, error: 'Sesi login tidak ditemukan.' };
    }

    const userCategories = current.categories.filter(
      (category) => category.userId === current.currentUser.id,
    );
    const fieldErrors = validateTransactionDraft({
      ...draft,
      categories: userCategories,
    });

    if (Object.keys(fieldErrors).length > 0) {
      return { ok: false, error: 'Periksa kembali detail transaksi.', fieldErrors };
    }

    const now = new Date().toISOString();
    const transaction = {
      id: createId(),
      userId: current.currentUser.id,
      type: draft.type,
      amount: Number(draft.amount),
      categoryId: draft.categoryId,
      note: String(draft.note).trim(),
      date: draft.date,
      createdAt: now,
      updatedAt: now,
    };
    const nextTransactions = [...current.transactions, transaction];

    try {
      await saveTransactions(nextTransactions);
      dispatch({ type: 'SET_TRANSACTIONS', payload: nextTransactions });
      return { ok: true, transaction };
    } catch (error) {
      return { ok: false, error: getActionErrorMessage(error) };
    }
  }, []);

  const updateTransaction = useCallback(async (transactionId, draft) => {
    const current = stateRef.current;

    if (!current.currentUser) {
      return { ok: false, error: 'Sesi login tidak ditemukan.' };
    }

    const existing = current.transactions.find(
      (transaction) =>
        transaction.id === transactionId &&
        transaction.userId === current.currentUser.id,
    );

    if (!existing) {
      return { ok: false, error: 'Transaksi tidak ditemukan.' };
    }

    const userCategories = current.categories.filter(
      (category) => category.userId === current.currentUser.id,
    );
    const fieldErrors = validateTransactionDraft({
      ...draft,
      categories: userCategories,
    });

    if (Object.keys(fieldErrors).length > 0) {
      return { ok: false, error: 'Periksa kembali detail transaksi.', fieldErrors };
    }

    const updatedTransaction = {
      ...existing,
      type: draft.type,
      amount: Number(draft.amount),
      categoryId: draft.categoryId,
      note: String(draft.note).trim(),
      date: draft.date,
      updatedAt: new Date().toISOString(),
    };
    const nextTransactions = current.transactions.map((transaction) =>
      transaction.id === transactionId ? updatedTransaction : transaction,
    );

    try {
      await saveTransactions(nextTransactions);
      dispatch({ type: 'SET_TRANSACTIONS', payload: nextTransactions });
      return { ok: true, transaction: updatedTransaction };
    } catch (error) {
      return { ok: false, error: getActionErrorMessage(error) };
    }
  }, []);

  const removeTransaction = useCallback(async (transactionId) => {
    const current = stateRef.current;

    if (!current.currentUser) {
      return { ok: false, error: 'Sesi login tidak ditemukan.' };
    }

    const exists = current.transactions.some(
      (transaction) =>
        transaction.id === transactionId &&
        transaction.userId === current.currentUser.id,
    );

    if (!exists) {
      return { ok: false, error: 'Transaksi tidak ditemukan.' };
    }

    const nextTransactions = current.transactions.filter(
      (transaction) => transaction.id !== transactionId,
    );

    try {
      await saveTransactions(nextTransactions);
      dispatch({ type: 'SET_TRANSACTIONS', payload: nextTransactions });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: getActionErrorMessage(error) };
    }
  }, []);

  const addCategory = useCallback(async ({ name, type, icon }) => {
    const current = stateRef.current;

    if (!current.currentUser) {
      return { ok: false, error: 'Sesi login tidak ditemukan.' };
    }

    const userCategories = current.categories.filter(
      (category) => category.userId === current.currentUser.id,
    );
    const fieldErrors = validateCategoryDraft({
      name,
      type,
      categories: userCategories,
    });

    if (Object.keys(fieldErrors).length > 0) {
      return { ok: false, error: 'Periksa kembali data kategori.', fieldErrors };
    }

    const now = new Date().toISOString();
    const category = {
      id: createId(),
      userId: current.currentUser.id,
      name: String(name).trim(),
      type,
      icon: CATEGORY_ICON_NAMES.includes(icon)
        ? icon
        : 'dots-horizontal-circle-outline',
      createdAt: now,
      updatedAt: now,
    };
    const nextCategories = [...current.categories, category];

    try {
      await saveCategories(nextCategories);
      dispatch({ type: 'SET_CATEGORIES', payload: nextCategories });
      return { ok: true, category };
    } catch (error) {
      return { ok: false, error: getActionErrorMessage(error) };
    }
  }, []);

  const updateCategory = useCallback(async (categoryId, { name, icon }) => {
    const current = stateRef.current;

    if (!current.currentUser) {
      return { ok: false, error: 'Sesi login tidak ditemukan.' };
    }

    const existing = current.categories.find(
      (category) =>
        category.id === categoryId && category.userId === current.currentUser.id,
    );

    if (!existing) {
      return { ok: false, error: 'Kategori tidak ditemukan.' };
    }

    const userCategories = current.categories.filter(
      (category) => category.userId === current.currentUser.id,
    );
    const fieldErrors = validateCategoryDraft({
      name,
      type: existing.type,
      categories: userCategories,
      editingId: categoryId,
    });

    if (Object.keys(fieldErrors).length > 0) {
      return { ok: false, error: 'Periksa kembali data kategori.', fieldErrors };
    }

    const updatedCategory = {
      ...existing,
      name: String(name).trim(),
      icon: CATEGORY_ICON_NAMES.includes(icon)
        ? icon
        : 'dots-horizontal-circle-outline',
      updatedAt: new Date().toISOString(),
    };
    const nextCategories = current.categories.map((category) =>
      category.id === categoryId ? updatedCategory : category,
    );

    try {
      await saveCategories(nextCategories);
      dispatch({ type: 'SET_CATEGORIES', payload: nextCategories });
      return { ok: true, category: updatedCategory };
    } catch (error) {
      return { ok: false, error: getActionErrorMessage(error) };
    }
  }, []);

  const removeCategory = useCallback(
    async (categoryId, fallbackCategoryId = null) => {
      const current = stateRef.current;

      if (!current.currentUser) {
        return { ok: false, error: 'Sesi login tidak ditemukan.' };
      }

      const existing = current.categories.find(
        (category) =>
          category.id === categoryId && category.userId === current.currentUser.id,
      );

      if (!existing) {
        return { ok: false, error: 'Kategori tidak ditemukan.' };
      }

      const linkedTransactions = current.transactions.filter(
        (transaction) =>
          transaction.userId === current.currentUser.id &&
          transaction.categoryId === categoryId,
      );
      let fallback = null;

      if (linkedTransactions.length > 0) {
        fallback = current.categories.find(
          (category) =>
            category.id === fallbackCategoryId &&
            category.id !== categoryId &&
            category.userId === current.currentUser.id &&
            category.type === existing.type,
        );

        if (!fallback) {
          return {
            ok: false,
            error: `Kategori ini dipakai ${linkedTransactions.length} transaksi. Pilih kategori pengganti terlebih dahulu.`,
          };
        }
      }

      const nextCategories = current.categories.filter(
        (category) => category.id !== categoryId,
      );
      const nextTransactions = linkedTransactions.length
        ? current.transactions.map((transaction) => {
            if (transaction.categoryId !== categoryId) {
              return transaction;
            }

            return {
              ...transaction,
              categoryId: fallback.id,
              updatedAt: new Date().toISOString(),
            };
          })
        : current.transactions;

      try {
        if (fallback) {
          await saveTransactionsAndCategories(nextTransactions, nextCategories);
        } else {
          await saveCategories(nextCategories);
        }

        dispatch({
          type: 'SET_FINANCE',
          payload: { transactions: nextTransactions, categories: nextCategories },
        });

        return {
          ok: true,
          movedTransactions: linkedTransactions.length,
          fallbackName: getCategoryFallbackName(fallback),
        };
      } catch (error) {
        return { ok: false, error: getActionErrorMessage(error) };
      }
    },
    [],
  );

  const currentUser = state.currentUser;
  const transactions = useMemo(
    () =>
      currentUser
        ? state.transactions.filter((transaction) => transaction.userId === currentUser.id)
        : [],
    [currentUser, state.transactions],
  );
  const categories = useMemo(
    () =>
      currentUser
        ? state.categories.filter((category) => category.userId === currentUser.id)
        : [],
    [currentUser, state.categories],
  );

  const value = useMemo(
    () => ({
      phase: state.phase,
      startupError: state.startupError,
      retryStartup: hydrate,
      currentUser,
      transactions,
      categories,
      login,
      register,
      logout,
      addTransaction,
      updateTransaction,
      removeTransaction,
      addCategory,
      updateCategory,
      removeCategory,
    }),
    [
      state.phase,
      state.startupError,
      currentUser,
      transactions,
      categories,
      hydrate,
      login,
      register,
      logout,
      addTransaction,
      updateTransaction,
      removeTransaction,
      addCategory,
      updateCategory,
      removeCategory,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
