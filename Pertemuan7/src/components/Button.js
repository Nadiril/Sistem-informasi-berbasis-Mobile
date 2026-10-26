import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme';

const PALETTE = {
  primary: { bg: colors.primary, text: colors.onPrimary, border: colors.primary },
  tonal: { bg: colors.primaryContainer, text: colors.onPrimaryContainer, border: colors.primaryContainer },
  outline: { bg: colors.surface, text: colors.primary, border: colors.outline },
  ghost: { bg: 'transparent', text: colors.primary, border: 'transparent' },
  danger: { bg: colors.surface, text: colors.error, border: colors.error },
};

/**
 * Tombol aksi utama. Tinggi 48px supaya aman sebagai target ketuk,
 * bentuk pil membedakannya dari kontainer kartu yang bersudut 16.
 */
export default function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  style,
  accessibilityHint,
}) {
  const palette = PALETTE[variant] ?? PALETTE.primary;
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: palette.bg, borderColor: palette.border },
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={palette.text} />
      ) : (
        <View style={styles.content}>
          {icon ? <Ionicons name={icon} size={18} color={palette.text} /> : null}
          <Text style={[styles.label, { color: palette.text }]} numberOfLines={1}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.45,
  },
});
