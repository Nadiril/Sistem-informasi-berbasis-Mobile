import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors, radii, withAlpha } from '../../theme';
import { FocusablePressable } from './FocusablePressable';

const variantStyles = {
  plain: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    iconColor: colors.neutral.textPrimary,
  },
  tonal: {
    backgroundColor: colors.primary[100],
    borderColor: colors.primary[100],
    iconColor: colors.primary[800],
  },
  surface: {
    backgroundColor: colors.neutral.surface,
    borderColor: withAlpha(colors.primary[950], 0.12),
    iconColor: colors.neutral.textPrimary,
  },
  danger: {
    backgroundColor: withAlpha(colors.semantic.error, 0.1),
    borderColor: 'transparent',
    iconColor: colors.semantic.error,
  },
};

export function IconButton({
  iconName,
  onPress,
  accessibilityLabel,
  variant = 'plain',
  size = 44,
  iconSize = 22,
  disabled = false,
  style,
  testID,
}) {
  const palette = variantStyles[variant] || variantStyles.plain;

  return (
    <FocusablePressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: palette.backgroundColor,
          borderColor: palette.borderColor,
          height: size,
          width: size,
        },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      testID={testID}
    >
      <MaterialCommunityIcons
        accessibilityElementsHidden
        color={disabled ? colors.neutral.disabled : palette.iconColor}
        importantForAccessibility="no-hide-descendants"
        name={iconName}
        size={iconSize}
      />
    </FocusablePressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: radii.sm,
    borderWidth: 1,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.72,
  },
  disabled: {
    backgroundColor: colors.neutral.surfaceVariant,
    borderColor: colors.neutral.surfaceVariant,
  },
});
