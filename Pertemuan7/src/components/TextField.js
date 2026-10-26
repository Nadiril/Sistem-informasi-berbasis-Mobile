import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius } from '../theme';

/**
 * Input berlabel dengan status fokus, pesan galat, dan tombol lihat/sembunyi
 * kata sandi. Target ketuk tombol mata dibuat 44px.
 */
export default function TextField({
  label,
  error,
  hint,
  secureTextEntry = false,
  leftIcon,
  onClear,
  containerStyle,
  ...inputProps
}) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secureTextEntry);

  const message = error || hint;
  const isMultiline = Boolean(inputProps.multiline);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.field, focused && styles.fieldFocused, error ? styles.fieldError : null]}>
        {leftIcon ? (
          <Ionicons
            name={leftIcon}
            size={18}
            color={focused ? colors.primary : colors.textMuted}
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          {...inputProps}
          style={[styles.input, isMultiline ? styles.inputMultiline : styles.inputSingle]}
          onFocus={(event) => {
            setFocused(true);
            inputProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            inputProps.onBlur?.(event);
          }}
          secureTextEntry={hidden}
          placeholderTextColor={colors.textFaint}
          selectionColor={colors.primary}
          accessibilityLabel={label}
        />

        {onClear && inputProps.value ? (
          <Pressable
            onPress={onClear}
            hitSlop={10}
            style={styles.toggle}
            accessibilityRole="button"
            accessibilityLabel="Hapus teks yang dicari"
          >
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </Pressable>
        ) : null}

        {secureTextEntry ? (
          <Pressable
            onPress={() => setHidden((current) => !current)}
            hitSlop={10}
            style={styles.toggle}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Tampilkan kata sandi' : 'Sembunyikan kata sandi'}
          >
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>

      {message ? (
        <Text style={[styles.message, error ? styles.messageError : styles.messageHint]}>{message}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: radius.field,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
  },
  fieldFocused: {
    borderColor: colors.primary,
  },
  fieldError: {
    borderColor: colors.error,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    paddingHorizontal: 0,
  },
  inputSingle: {
    paddingVertical: 0,
  },
  inputMultiline: {
    minHeight: 96,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  toggle: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  message: {
    fontSize: 12,
    lineHeight: 16,
  },
  messageError: {
    color: colors.error,
  },
  messageHint: {
    color: colors.textMuted,
  },
});
