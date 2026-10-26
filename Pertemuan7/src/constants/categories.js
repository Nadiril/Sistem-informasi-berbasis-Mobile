/**
 * Satu sumber daftar kategori: dipakai oleh form tambah produk, filter
 * pencarian, dan ikon pada baris produk supaya tidak ada label yang beda-beda.
 */
export const CATEGORIES = [
  { value: 'Makanan', icon: 'fast-food-outline' },
  { value: 'Minuman', icon: 'cafe-outline' },
  { value: 'Pakaian', icon: 'shirt-outline' },
  { value: 'Elektronik', icon: 'phone-portrait-outline' },
  { value: 'Aksesoris', icon: 'bag-handle-outline' },
  { value: 'Lainnya', icon: 'cube-outline' },
];

export const DEFAULT_CATEGORY = 'Lainnya';

export function iconForCategory(category) {
  const found = CATEGORIES.find((item) => item.value === category);
  return found ? found.icon : 'cube-outline';
}

/** Produk contoh yang dibuat saat akun pertama kali dibuat. */
export const SAMPLE_PRODUCTS = [
  {
    name: 'Kopi Susu Gula Aren',
    category: 'Minuman',
    price: 18000,
    stock: 24,
    description: 'Contoh produk: kopi susu 250 ml.',
    featured: true,
    isSample: true,
  },
  {
    name: 'Roti Bakar Cokelat',
    category: 'Makanan',
    price: 15000,
    stock: 12,
    description: 'Contoh produk: roti bakar dua potong.',
    featured: false,
    isSample: true,
  },
  {
    name: 'Sambal Botol 200 ml',
    category: 'Makanan',
    price: 25000,
    stock: 0,
    description: 'Contoh produk: sambal rumahan, stok habis.',
    featured: false,
    isSample: true,
  },
  {
    name: 'Tote Bag Kanvas',
    category: 'Aksesoris',
    price: 65000,
    stock: 8,
    description: 'Contoh produk: tote bag kanvas polos.',
    featured: true,
    isSample: true,
  },
];
