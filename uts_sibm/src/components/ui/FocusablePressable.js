import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { colors } from '../../theme';

export function FocusablePressable({
  children,
  style,
  disabled = false,
  focusRingColor = colors.primary[700],
  onFocus,
  onBlur,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Pressable
      {...props}
      disabled={disabled}
      focusable={!disabled}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      style={(state) => [
        styles.base,
        disabled ? styles.disabledCursor : styles.enabledCursor,
        typeof style === 'function' ? style(state) : style,
        isFocused && !disabled ? [styles.focusRing, { outlineColor: focusRingColor }] : null,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    outlineOffset: 2,
  },
  enabledCursor: {
    cursor: 'pointer',
  },
  disabledCursor: {
    cursor: 'not-allowed',
  },
  focusRing: {
    outlineStyle: 'solid',
    outlineWidth: 3,
  },
});
