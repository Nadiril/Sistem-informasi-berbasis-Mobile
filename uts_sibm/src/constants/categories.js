export const CATEGORY_ICONS = [
  { name: 'silverware-fork-knife', label: 'Makanan' },
  { name: 'coffee', label: 'Minuman' },
  { name: 'bus', label: 'Transportasi umum' },
  { name: 'car', label: 'Kendaraan' },
  { name: 'fuel', label: 'Bahan bakar' },
  { name: 'file-document-outline', label: 'Tagihan' },
  { name: 'receipt-text-outline', label: 'Belanja harian' },
  { name: 'shopping-outline', label: 'Belanja' },
  { name: 'hanger', label: 'Fashion' },
  { name: 'movie-open-outline', label: 'Hiburan' },
  { name: 'gamepad-variant', label: 'Permainan' },
  { name: 'medical-bag', label: 'Kesehatan' },
  { name: 'dumbbell', label: 'Olahraga' },
  { name: 'school-outline', label: 'Pendidikan' },
  { name: 'book-open-page-variant', label: 'Buku' },
  { name: 'home', label: 'Rumah' },
  { name: 'tools', label: 'Perbaikan' },
  { name: 'paw', label: 'Hewan peliharaan' },
  { name: 'airplane', label: 'Perjalanan' },
  { name: 'baby-face-outline', label: 'Keluarga' },
  { name: 'cash-multiple', label: 'Gaji' },
  { name: 'wallet-outline', label: 'Uang saku' },
  { name: 'gift-outline', label: 'Bonus' },
  { name: 'laptop', label: 'Freelance' },
  { name: 'chart-line', label: 'Investasi' },
  { name: 'bank', label: 'Bank' },
  { name: 'piggy-bank', label: 'Tabungan' },
  { name: 'briefcase', label: 'Pekerjaan' },
  { name: 'dots-horizontal-circle-outline', label: 'Lainnya' },
];

export const CATEGORY_ICON_NAMES = CATEGORY_ICONS.map((icon) => icon.name);

export const DEFAULT_CATEGORY_DEFINITIONS = [
  { name: 'Makanan', type: 'expense', icon: 'silverware-fork-knife' },
  { name: 'Transportasi', type: 'expense', icon: 'bus' },
  { name: 'Tagihan', type: 'expense', icon: 'file-document-outline' },
  { name: 'Belanja', type: 'expense', icon: 'shopping-outline' },
  { name: 'Hiburan', type: 'expense', icon: 'movie-open-outline' },
  { name: 'Kesehatan', type: 'expense', icon: 'medical-bag' },
  { name: 'Pendidikan', type: 'expense', icon: 'school-outline' },
  { name: 'Lainnya', type: 'expense', icon: 'dots-horizontal-circle-outline' },
  { name: 'Gaji', type: 'income', icon: 'cash-multiple' },
  { name: 'Uang saku', type: 'income', icon: 'wallet-outline' },
  { name: 'Bonus', type: 'income', icon: 'gift-outline' },
  { name: 'Freelance', type: 'income', icon: 'laptop' },
  { name: 'Investasi', type: 'income', icon: 'chart-line' },
  { name: 'Lainnya', type: 'income', icon: 'dots-horizontal-circle-outline' },
];

export const TRANSACTION_TYPES = {
  income: 'Pemasukan',
  expense: 'Pengeluaran',
};

export const REPORT_PERIODS = [
  { value: 'daily', label: 'Harian' },
  { value: 'weekly', label: 'Mingguan' },
  { value: 'monthly', label: 'Bulanan' },
  { value: 'yearly', label: 'Tahunan' },
];

export const APP_NAME = 'Expense Tracker';
