const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SHOP_NAME_PATTERN = /^[A-Za-z0-9][A-Za-z0-9 .'_-]{1,29}$/;

export const LIMITS = {
  identifier: 64,
  password: 64,
  passwordMin: 6,
  productName: 60,
  description: 200,
  priceMax: 1000000000,
  stockMax: 999999,
};

export function normalizeIdentifier(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .slice(0, LIMITS.identifier);
}

/**
 * Login menerima dua bentuk: email atau nama toko.
 * Mengembalikan pesan error, atau null bila valid.
 */
export function validateIdentifier(value) {
  const identifier = normalizeIdentifier(value);

  if (!identifier) return 'Email atau nama toko wajib diisi.';
  if (identifier.includes('@')) {
    if (identifier.length > 254 || !EMAIL_PATTERN.test(identifier)) {
      return 'Format email belum benar, contoh: nama@toko.com';
    }
    return null;
  }
  if (identifier.length < 3) return 'Nama toko minimal 3 karakter.';
  if (!SHOP_NAME_PATTERN.test(identifier)) {
    return 'Nama toko hanya boleh berisi huruf, angka, spasi, titik, garis bawah, dan strip.';
  }
  return null;
}

export function validatePassword(value, { requireExisting = false } = {}) {
  const password = String(value ?? '');
  if (!password) return requireExisting ? 'Kata sandi wajib diisi.' : 'Kata sandi wajib diisi.';
  if (password.length < LIMITS.passwordMin) return `Kata sandi minimal ${LIMITS.passwordMin} karakter.`;
  if (password.length > LIMITS.password) return `Kata sandi maksimal ${LIMITS.password} karakter.`;
  return null;
}

export function validateLogin({ identifier, password }) {
  const errors = {};
  const identifierError = validateIdentifier(identifier);
  const passwordError = validatePassword(password);
  if (identifierError) errors.identifier = identifierError;
  if (passwordError) errors.password = passwordError;
  return errors;
}

function cleanText(value) {
  return String(value ?? '').trim();
}

/**
 * Validasi form tambah produk.
 * Mengembalikan objek errors, kosong bila semua valid.
 */
export function validateProduct(input) {
  const errors = {};
  const name = cleanText(input.name);
  const description = cleanText(input.description);
  const price = Number(input.price);
  const stock = Number(input.stock);

  if (!name) {
    errors.name = 'Nama produk wajib diisi.';
  } else if (name.length > LIMITS.productName) {
    errors.name = `Nama produk maksimal ${LIMITS.productName} karakter.`;
  }

  if (cleanText(input.price) === '') {
    errors.price = 'Harga wajib diisi.';
  } else if (!Number.isFinite(price) || price < 0) {
    errors.price = 'Harga berupa angka 0 atau lebih.';
  } else if (price > LIMITS.priceMax) {
    errors.price = 'Harga terlalu besar.';
  }

  if (cleanText(input.stock) === '') {
    errors.stock = 'Stok wajib diisi.';
  } else if (!Number.isInteger(stock) || stock < 0) {
    errors.stock = 'Stok berupa bilangan bulat 0 atau lebih.';
  } else if (stock > LIMITS.stockMax) {
    errors.stock = 'Stok terlalu besar.';
  }

  if (description.length > LIMITS.description) {
    errors.description = `Deskripsi maksimal ${LIMITS.description} karakter.`;
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
