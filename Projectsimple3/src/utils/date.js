/**
 * Utilitas pemformatan tanggal untuk catatan.
 * Contoh hasil: "26 Okt 2026, 14.30"
 */

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

const pad = (value) => String(value).padStart(2, '0');

/**
 * Format timestamp ISO-8601 menjadi tanggal + jam lokal yang ringkas.
 * Mengembalikan string kosong jika input tidak valid.
 */
export function formatDateTime(isoString) {
  if (typeof isoString !== 'string' || isoString.length === 0) {
    return '';
  }

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const day = date.getDate();
  const month = MONTH_SHORT[date.getMonth()];
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day} ${month} ${year}, ${hours}.${minutes}`;
}
