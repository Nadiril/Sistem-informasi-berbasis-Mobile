import { StyleSheet, View } from 'react-native';

import { colors, radii, shadows, spacing, withAlpha } from '../../theme';

const variantStyles = {
  surface: {
    backgroundColor: colors.neutral.surface,
    borderColor: withAlpha(colors.primary[950], 0.06),
    borderWidth: 1,
  },
  tonal: {
    backgroundColor: colors.primary[50],
    borderColor: withAlpha(colors.primary[600], 0.12),
    borderWidth: 1,
  },
  dark: {
    backgroundColor: colors.primary[950],
    borderColor: colors.primary[950],
    borderWidth: 1,
  },
};

export function SurfaceCard({
  children,
  variant = 'surface',
  padded = true,
  style,
  elevated = false,
}) {
  return (
    <View
      style={[
        styles.card,
        variantStyles[variant],
        padded && styles.padded,
        elevated && shadows.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  padded: {
    padding: spacing.lg,
  },
});
