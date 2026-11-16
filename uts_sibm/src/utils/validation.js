import { digitsToNumber } from './currency';
import { isValidDateKey } from './date';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TRANSACTION_AMOUNT = 999_999_999_999;

export function normalizeEmail(email) {
  return String(email ?? '').trim().toLowerCase();
}

export function validateName(name) {
  const value = String(name ?? '').trim();

  if (value.length < 2) {
    return 'Nama minimal 2 karakter.';
  }

  if (value.length > 60) {
    return 'Nama maksimal 60 karakter.';
  }

  return null;
}

export function validateEmail(email) {
  const value = normalizeEmail(email);

  if (!value) {
    return 'Email wajib diisi.';
  }

  if (!EMAIL_PATTERN.test(value)) {
    return 'Format email belum benar.';
  }

  return null;
}

export function validatePassword(password) {
  if (String(password ?? '').length < 6) {
    return 'Password minimal 6 karakter.';
  }

  return null;
}

export function validateTransactionDraft({
  type,
  amount,
  categoryId,
  note,
  date,
  categories,
}) {
  const errors = {};
  const numericAmount = Number(amount);

  if (type !== 'income' && type !== 'expense') {
    errors.type = 'Pilih jenis transaksi.';
  }

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    errors.amount = 'Nominal harus lebih dari nol.';
  } else if (numericAmount > MAX_TRANSACTION_AMOUNT) {
    errors.amount = 'Nominal terlalu besar.';
  }

  if (!categoryId) {
    errors.categoryId = 'Pilih kategori.';
  } else {
    const category = categories.find((item) => item.id === categoryId);

    if (!category) {
      errors.categoryId = 'Kategori tidak ditemukan.';
    } else if (category.type !== type) {
      errors.categoryId = 'Kategori tidak sesuai dengan jenis transaksi.';
    }
  }

  const trimmedNote = String(note ?? '').trim();

  if (trimmedNote.length < 2) {
    errors.note = 'Deskripsi minimal 2 karakter.';
  } else if (trimmedNote.length > 80) {
    errors.note = 'Deskripsi maksimal 80 karakter.';
  }

  if (!isValidDateKey(date)) {
    errors.date = 'Tanggal belum valid.';
  }

  return errors;
}

export function validateCategoryDraft({ name, type, categories, editingId = null }) {
  const errors = {};
  const trimmedName = String(name ?? '').trim();

  if (trimmedName.length < 2) {
    errors.name = 'Nama kategori minimal 2 karakter.';
  } else if (trimmedName.length > 30) {
    errors.name = 'Nama kategori maksimal 30 karakter.';
  } else {
    const duplicate = categories.some(
      (category) =>
        category.id !== editingId &&
        category.type === type &&
        category.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (duplicate) {
      errors.name = 'Nama kategori sudah digunakan.';
    }
  }

  if (type !== 'income' && type !== 'expense') {
    errors.type = 'Pilih jenis kategori.';
  }

  return errors;
}

export function draftFromAmountInput(text) {
  return digitsToNumber(text);
}
