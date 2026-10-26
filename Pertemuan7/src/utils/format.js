const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/**
 * Format rupiah tanpa Intl agar konsisten di Hermes dan web.
 * Contoh: 18000 -> "Rp 18.000"
 */
export function formatCurrency(value) {
  const amount = Math.round(Number(value) || 0);
  const sign = amount < 0 ? '-' : '';
  const digits = String(Math.abs(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${sign}Rp ${digits}`;
}

export function formatNumber(value) {
  const amount = Math.round(Number(value) || 0);
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatDate(iso) {
  const date = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(date.getTime())) return '-';
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatShortDate(iso) {
  const date = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(date.getTime())) return '-';
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}

/** Inisial untuk avatar berbasis teks, maksimal dua huruf. */
export function getInitials(name) {
  const words = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return '?';
  const first = words[0].charAt(0);
  const second = words.length > 1 ? words[words.length - 1].charAt(0) : '';
  return (first + second).toUpperCase();
}

export function greetingByHour(date = new Date()) {
  const hour = date.getHours();
  if (hour < 11) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 18) return 'Selamat sore';
  return 'Selamat malam';
}
