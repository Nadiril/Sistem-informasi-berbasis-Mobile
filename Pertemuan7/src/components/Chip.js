import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius } from '../theme';

/**
 * Chip filter. Bentuk pil membedakannya dari tombol aksi utama,
 * warna terisi menandai filter yang sedang aktif.
 */
export default function Chip({ label, selected = false, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Filter ${label}`}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : styles.chipIdle,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, selected ? styles.labelSelected : styles.labelIdle]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipIdle: {
    backgroundColor: colors.surface,
    borderColor: colors.outline,
  },
  chipSelected: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primaryContainer,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  labelIdle: {
    color: colors.textMuted,
  },
  labelSelected: {
    color: colors.onPrimaryContainer,
  },
});
