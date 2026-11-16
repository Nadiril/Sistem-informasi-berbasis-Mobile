import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors, fontFamilies, radii, spacing, withAlpha } from '../../theme';
import { AppText } from '../AppText';
import { FocusablePressable } from './FocusablePressable';

export function AppTextInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helperText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoComplete,
  prefix,
  leftIconName,
  editable = true,
  maxLength,
  multiline = false,
  numberOfLines,
  style,
  inputStyle,
  testID,
  returnKeyType,
  onSubmitEditing,
  blurOnSubmit,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const showPasswordToggle = secureTextEntry;
  const hasError = Boolean(error);

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <AppText color={colors.neutral.textSecondary} style={styles.label} variant="label">
          {label}
        </AppText>
      ) : null}
      <View
        style={[
          styles.inputShell,
          isFocused && styles.inputShellFocused,
          hasError && styles.inputShellError,
          !editable && styles.inputShellDisabled,
          multiline && styles.inputShellMultiline,
        ]}
      >
        {leftIconName ? (
          <MaterialCommunityIcons
            accessibilityElementsHidden
            color={colors.neutral.textSecondary}
            importantForAccessibility="no-hide-descendants"
            name={leftIconName}
            size={20}
          />
        ) : null}
        {prefix ? (
          <AppText color={colors.neutral.textSecondary} variant="bodyStrong">
            {prefix}
          </AppText>
        ) : null}
        <TextInput
          accessibilityLabel={label}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          blurOnSubmit={blurOnSubmit}
          editable={editable}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral.textSecondary}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          selectionColor={colors.primary[600]}
          style={[styles.input, multiline && styles.inputMultiline, inputStyle]}
          testID={testID}
          value={value}
        />
        {showPasswordToggle ? (
          <FocusablePressable
            accessibilityLabel={
              isPasswordVisible ? 'Sembunyikan password' : 'Tampilkan password'
            }
            accessibilityRole="button"
            onPress={() => setIsPasswordVisible((current) => !current)}
            style={styles.visibilityButton}
          >
            <MaterialCommunityIcons
              color={colors.neutral.textSecondary}
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={21}
            />
          </FocusablePressable>
        ) : null}
      </View>
      {error ? (
        <AppText
          accessibilityLiveRegion="polite"
          color={colors.semantic.error}
          style={styles.message}
          variant="caption"
        >
          {error}
        </AppText>
      ) : helperText ? (
        <AppText
          color={colors.neutral.textSecondary}
          style={styles.message}
          variant="caption"
        >
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    marginLeft: 2,
  },
  inputShell: {
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    borderColor: withAlpha(colors.primary[950], 0.16),
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 54,
    paddingHorizontal: spacing.lg,
  },
  inputShellFocused: {
    borderColor: colors.primary[700],
    borderWidth: 2,
    paddingHorizontal: spacing.lg - 1,
  },
  inputShellError: {
    borderColor: colors.semantic.error,
  },
  inputShellDisabled: {
    backgroundColor: colors.neutral.surfaceVariant,
  },
  inputShellMultiline: {
    alignItems: 'flex-start',
    minHeight: 96,
    paddingVertical: spacing.md,
  },
  input: {
    color: colors.neutral.textPrimary,
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 15,
    minHeight: 50,
    paddingVertical: spacing.md,
  },
  inputMultiline: {
    minHeight: 72,
    paddingTop: 0,
    textAlignVertical: 'top',
  },
  visibilityButton: {
    alignItems: 'center',
    borderRadius: radii.sm,
    height: 44,
    justifyContent: 'center',
    marginRight: -spacing.sm,
    width: 44,
  },
  message: {
    marginLeft: 2,
  },
});
