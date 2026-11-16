import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors, pagePadding, radii, shadows, spacing } from '../../theme';
import { AppText } from '../AppText';
import { FocusablePressable } from './FocusablePressable';

export function Fab({ label = 'Tambah', iconName = 'plus', onPress, style }) {
  return (
    <FocusablePressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.fab, pressed && styles.pressed, style]}
    >
      <MaterialCommunityIcons
        accessibilityElementsHidden
        color="#FFFFFF"
        importantForAccessibility="no-hide-descendants"
        name={iconName}
        size={24}
      />
      <AppText color="#FFFFFF" style={styles.label} variant="button">
        {label}
      </AppText>
    </FocusablePressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    alignItems: 'center',
    backgroundColor: colors.primary[600],
    borderRadius: radii.md,
    bottom: spacing.xl,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    position: 'absolute',
    right: pagePadding,
    ...shadows.floating,
  },
  label: {
    flexShrink: 1,
  },
  pressed: {
    backgroundColor: colors.primary[700],
  },
});
