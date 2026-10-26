/**
 * Design tokens aplikasi.
 *
 * Arah visual: permukaan bersih ala Google Pixel (Material 3, mode terang).
 * Alasan keputusan warna:
 * - Biru #0B57D0 adalah satu-satunya warna aksen, dipakai untuk aksi utama dan
 *   status aktif supaya hierarki mudah dibaca dalam satu warna.
 * - Abu netral dipakai untuk permukaan dan teks, tidak dihitung sebagai warna inti.
 * - Amber #E37400 hanya untuk penanda unggulan (kontras 3,1:1 terhadap putih).
 */

export const colors = {
  primary: '#0B57D0',
  onPrimary: '#FFFFFF',
  primaryContainer: '#D3E3FD',
  onPrimaryContainer: '#0842A0',

  background: '#F5F7FB',
  surface: '#FFFFFF',
  surfaceAlt: '#EDF1F7',

  outline: '#D7DBE0',
  divider: '#E5E8EE',

  text: '#1B1B1F',
  textMuted: '#5F6368',
  textFaint: '#787C83',

  error: '#B3261E',
  errorContainer: '#FCE8E6',
  onErrorContainer: '#8C1D18',

  success: '#137333',
  successContainer: '#E6F4EA',
  onSuccessContainer: '#0D5C2B',

  featured: '#E37400',
  disabled: '#B6BAC1',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

/**
 * Radius sengaja dibuat berbeda per peran: kontrol aksi (tombol, chip) memakai
 * pil, input memakai 12, kontainer kartu memakai 16 supaya hierarki terbaca.
 */
export const radius = {
  field: 12,
  card: 16,
  sheet: 24,
  pill: 999,
};

export const typography = {
  display: { fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: -0.4 },
  title: { fontSize: 22, lineHeight: 28, fontWeight: '700', letterSpacing: -0.2 },
  subtitle: { fontSize: 17, lineHeight: 24, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' },
};

/**
 * Bayangan hanya dipakai pada kartu yang naik satu tingkat (statistik dan
 * daftar utama), supaya bukan semua elemen terasa melayang.
 */
export const elevation = {
  raised: {
    shadowColor: '#1B1B1F',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
};

export const theme = { colors, spacing, radius, typography, elevation };

export default theme;
