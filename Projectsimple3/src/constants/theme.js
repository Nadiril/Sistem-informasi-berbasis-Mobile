/**
 * Design tokens bergaya Material 3 / Google Pixel (light mode).
 * Dipakai oleh seluruh komponen UI agar warna, radius, dan tipografi konsisten.
 */

export const colors = {
  background: '#FDFBFF',
  surface: '#FFFFFF',
  surfaceMuted: '#F3F1F9',
  primary: '#4C5FD5',
  onPrimary: '#FFFFFF',
  primaryContainer: '#DFE1FF',
  onPrimaryContainer: '#1B2290',
  text: '#1B1B1F',
  textSecondary: '#55555F',
  textMuted: '#8A8894',
  border: '#E4E1EC',
  danger: '#B3261E',
  dangerContainer: '#F9DEDC',
  favoriteActive: '#D93025',
  shadow: '#000000',
};

/** Warna pastel untuk kartu catatan. Teks gelap tetap terbaca di atasnya. */
export const cardColors = [
  '#DDEBFF',
  '#E9E1FF',
  '#FFE7C8',
  '#D8F3E5',
  '#FFDCE5',
  '#FFF3B0',
  '#E3F4FF',
  '#E8F0D8',
];

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
};

export const typography = {
  display: { fontSize: 26, fontWeight: '700', letterSpacing: 0.2 },
  title: { fontSize: 18, fontWeight: '700' },
  heading: { fontSize: 16, fontWeight: '600' },
  body: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
};

/** Ukuran target sentuh minimum (44x44) sesuai pedoman aksesibilitas PRD §7.2. */
export const touchTarget = {
  minWidth: 44,
  minHeight: 44,
};
