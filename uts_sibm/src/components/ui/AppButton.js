import { ActivityIndicator, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors, radii, spacing } from '../../theme';
import { AppText } from '../AppText';
import { FocusablePressable } from './FocusablePressable';

const variantStyles = {
  primary: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
    textColor: '#FFFFFF',
  },
  tonal: {
    backgroundColor: colors.primary[100],
    borderColor: colors.primary[100],
    textColor: colors.primary[900],
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.neutral.outline,
    textColor: colors.neutral.textPrimary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    textColor: colors.primary[700],
  },
  danger: {
    backgroundColor: colors.semantic.error,
    borderColor: colors.semantic.error,
    textColor: '#FFFFFF',
  },
  inverse: {
    backgroundColor: colors.primary[100],
    borderColor: colors.primary[100],
    textColor: colors.primary[950],
  },
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  iconName,
  loading = false,
  disabled = false,
  size = 'md',
  fullWidth = true,
  style,
  testID,
  accessibilityHint,
}) {
  const palette = variantStyles[variant] || variantStyles.primary;
  const isDisabled = disabled || loading;

  return (
    <FocusablePressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      android_ripple={{ color: colors.primary[200] }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        size === 'sm' ? styles.buttonSmall : styles.buttonMedium,
        {
          backgroundColor: palette.backgroundColor,
          borderColor: palette.borderColor,
        },
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color={palette.textColor} size="small" />
      ) : (
        <>
          {iconName ? (
            <MaterialCommunityIcons
              accessibilityElementsHidden
              color={palette.textColor}
              importantForAccessibility="no-hide-descendants"
              name={iconName}
              size={20}
            />
          ) : null}
          <AppText
            style={[
              styles.label,
              { color: isDisabled ? colors.neutral.textSecondary : palette.textColor },
            ]}
            variant="button"
          >
            {label}
          </AppText>
        </>
      )}
    </FocusablePressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  buttonMedium: {
    minHeight: 52,
  },
  buttonSmall: {
    minHeight: 44,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.88,
  },
  disabled: {
    backgroundColor: colors.neutral.surfaceVariant,
    borderColor: colors.neutral.surfaceVariant,
    opacity: 0.7,
  },
  label: {
    flexShrink: 1,
    textAlign: 'center',
  },
});
