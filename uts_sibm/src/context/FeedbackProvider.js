import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { colors, radii, shadows, spacing, withAlpha } from '../theme';

const FeedbackContext = createContext(null);

const TOAST_DURATION_MS = 4200;

export function useFeedback() {
  const value = useContext(FeedbackContext);

  if (!value) {
    throw new Error('useFeedback harus dipakai di dalam FeedbackProvider.');
  }

  return value;
}

export function FeedbackProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const dismissFeedback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setToast(null);
  }, []);

  const showFeedback = useCallback(
    (message, type = 'success') => {
      if (!message) {
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setToast({ message, type, id: Date.now() });
      timeoutRef.current = setTimeout(() => {
        setToast(null);
        timeoutRef.current = null;
      }, TOAST_DURATION_MS);
    },
    [],
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  return (
    <FeedbackContext.Provider value={{ showFeedback, dismissFeedback }}>
      {children}
      <ToastMessage toast={toast} />
    </FeedbackContext.Provider>
  );
}

function ToastMessage({ toast }) {
  const insets = useSafeAreaInsets();

  if (!toast) {
    return null;
  }

  const isError = toast.type === 'error';

  return (
    <View pointerEvents="none" style={[styles.toastLayer, { bottom: insets.bottom + 88 }]}>
      <View
        accessibilityLiveRegion="polite"
        accessibilityRole="alert"
        style={[styles.toast, isError && styles.toastError]}
      >
        <MaterialCommunityIcons
          accessibilityElementsHidden
          color={isError ? colors.primary[100] : colors.semantic.success}
          importantForAccessibility="no-hide-descendants"
          name={isError ? 'alert-circle-outline' : 'check-circle-outline'}
          size={20}
        />
        <AppText style={styles.toastText} variant="bodyStrong">
          {toast.message}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toastLayer: {
    left: 0,
    paddingHorizontal: spacing.lg,
    position: 'absolute',
    right: 0,
    zIndex: 100,
  },
  toast: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary[950],
    borderRadius: radii.md,
    flexDirection: 'row',
    gap: spacing.md,
    maxWidth: 520,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    width: '100%',
    ...shadows.floating,
  },
  toastError: {
    backgroundColor: colors.primary[900],
    borderColor: withAlpha(colors.semantic.error, 0.5),
    borderWidth: 1,
  },
  toastText: {
    color: colors.primary[50],
    flex: 1,
  },
});
