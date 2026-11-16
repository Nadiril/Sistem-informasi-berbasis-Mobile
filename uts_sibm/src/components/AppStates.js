import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, pagePadding, radii, spacing, withAlpha } from '../theme';
import { AppText } from './AppText';
import { AppButton } from './ui/AppButton';

function useFullScreenInsets() {
  const insets = useSafeAreaInsets();

  return {
    paddingBottom: insets.bottom + spacing.xxl,
    paddingTop: insets.top + spacing.xxl,
  };
}

export function LoadingState({ label = 'Memuat data...', fullScreen = true, style }) {
  const insets = useFullScreenInsets();

  return (
    <View style={[styles.center, fullScreen && insets, style]}>
      <ActivityIndicator color={colors.primary[600]} size="large" />
      <AppText color={colors.neutral.textSecondary} style={styles.loadingLabel} variant="body">
        {label}
      </AppText>
    </View>
  );
}

export function EmptyState({
  iconName = 'receipt-text-outline',
  title,
  message,
  actionLabel,
  onAction,
  style,
}) {
  return (
    <View style={[styles.panel, style]}>
      <View style={styles.iconBubble}>
        <MaterialCommunityIcons
          accessibilityElementsHidden
          color={colors.primary[700]}
          importantForAccessibility="no-hide-descendants"
          name={iconName}
          size={26}
        />
      </View>
      <AppText style={styles.panelTitle} variant="section">
        {title}
      </AppText>
      {message ? (
        <AppText color={colors.neutral.textSecondary} style={styles.panelMessage} variant="body">
          {message}
        </AppText>
      ) : null}
      {actionLabel && onAction ? (
        <AppButton
          label={actionLabel}
          onPress={onAction}
          size="sm"
          style={styles.panelAction}
          variant="tonal"
        />
      ) : null}
    </View>
  );
}

export function ErrorState({
  title = 'Terjadi kesalahan',
  message,
  actionLabel = 'Coba lagi',
  onAction,
  fullScreen = true,
  style,
}) {
  const insets = useFullScreenInsets();

  return (
    <View style={[styles.center, fullScreen && insets, style]}>
      <View style={[styles.iconBubble, styles.iconBubbleError]}>
        <MaterialCommunityIcons
          accessibilityElementsHidden
          color={colors.semantic.error}
          importantForAccessibility="no-hide-descendants"
          name="alert-circle-outline"
          size={26}
        />
      </View>
      <AppText style={styles.panelTitle} variant="section">
        {title}
      </AppText>
      {message ? (
        <AppText color={colors.neutral.textSecondary} style={styles.panelMessage} variant="body">
          {message}
        </AppText>
      ) : null}
      {onAction ? (
        <AppButton
          label={actionLabel}
          onPress={onAction}
          size="sm"
          style={styles.panelAction}
          variant="primary"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    backgroundColor: colors.neutral.background,
    justifyContent: 'center',
    paddingHorizontal: pagePadding,
  },
  iconBubble: {
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    borderRadius: radii.pill,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  iconBubbleError: {
    backgroundColor: withAlpha(colors.semantic.error, 0.1),
  },
  loadingLabel: {
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  panel: {
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    borderColor: withAlpha(colors.primary[950], 0.06),
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.xl,
    width: '100%',
  },
  panelAction: {
    marginTop: spacing.lg,
  },
  panelMessage: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  panelTitle: {
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});
