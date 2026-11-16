export const colors = {
  primary: {
    50: '#FCF7EA',
    100: '#F8EBC9',
    200: '#F1D597',
    300: '#E9B75B',
    400: '#E19B2E',
    500: '#D18521',
    600: '#AA5F18',
    700: '#904818',
    800: '#783B1B',
    900: '#67311C',
    950: '#3B180D',
  },
  semantic: {
    income: '#2E7D32',
    expense: '#C62828',
    warning: '#ED9B24',
    info: '#1976D2',
    success: '#388E3C',
    error: '#D32F2F',
  },
  neutral: {
    background: '#FFFBF5',
    surface: '#FFFFFF',
    surfaceVariant: '#F5EFE5',
    outline: '#82776B',
    textPrimary: '#241A12',
    textSecondary: '#71665C',
    disabled: '#BDB5AA',
  },
};

export const fontFamilies = {
  regular: 'Roboto_400Regular',
  medium: 'Roboto_500Medium',
  semibold: 'Roboto_600SemiBold',
  bold: 'Roboto_700Bold',
};

export const textStyles = {
  display: {
    fontFamily: fontFamilies.bold,
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: -0.8,
  },
  headline: {
    fontFamily: fontFamilies.bold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.4,
  },
  title: {
    fontFamily: fontFamilies.semibold,
    fontSize: 21,
    lineHeight: 28,
  },
  section: {
    fontFamily: fontFamilies.semibold,
    fontSize: 17,
    lineHeight: 23,
  },
  body: {
    fontFamily: fontFamilies.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  bodyStrong: {
    fontFamily: fontFamilies.medium,
    fontSize: 15,
    lineHeight: 22,
  },
  label: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    fontFamily: fontFamilies.semibold,
    fontSize: 15,
    lineHeight: 20,
  },
  caption: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    lineHeight: 17,
  },
  amount: {
    fontFamily: fontFamilies.bold,
    fontSize: 21,
    lineHeight: 27,
    fontVariant: ['tabular-nums'],
  },
  amountSmall: {
    fontFamily: fontFamilies.semibold,
    fontSize: 16,
    lineHeight: 22,
    fontVariant: ['tabular-nums'],
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radii = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  pill: 999,
};

export const pagePadding = spacing.lg + spacing.xs;

// 56 adalah tinggi minimum tombol tambah melayang, ditambah jarak aman atas dan bawah.
export const fabClearance = 56 + spacing.lg * 2;

// Bottom navigation melayang: tinggi bar, jarak ke tepi layar, dan jarak ke area aman bawah.
export const floatingTabBar = Object.freeze({
  height: 64,
  horizontalInset: spacing.md,
  bottomInset: spacing.sm + 2,
});

export const shadows = {
  card: {
    shadowColor: colors.primary[950],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  floating: {
    shadowColor: colors.primary[950],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 7,
  },
};

export const motion = {
  quick: 160,
  regular: 240,
};

export const chartTheme = {
  background: colors.neutral.surface,
  plotBackground: colors.neutral.surface,
  grid: withAlpha(colors.primary[950], 0.08),
  axis: withAlpha(colors.primary[950], 0.14),
  text: colors.neutral.textSecondary,
  mutedText: colors.neutral.textSecondary,
  series: [colors.semantic.income, colors.semantic.expense],
  typography: {
    fontFamily: fontFamilies.regular,
    axisLabelSize: 10,
    legendLabelSize: 11,
  },
};

export function withAlpha(hex, opacity) {
  const sanitized = hex.replace('#', '');
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split('')
          .map((character) => character + character)
          .join('')
      : sanitized;
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}
