import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import Button from './Button';

/** Status memuat, tampil sebagai blok di tengah area konten. */
export function LoadingBlock({ label = 'Memuat data...' }) {
  return (
    <View style={styles.block} accessibilityRole="progressbar" accessibilityLabel={label}>
      <ActivityIndicator size="small" color={colors.primary} />
      <Text style={styles.description}>{label}</Text>
    </View>
  );
}

/** Status gagal memuat, selalu punya aksi coba lagi. */
export function ErrorBlock({ message, onRetry }) {
  return (
    <View style={styles.block}>
      <View style={[styles.iconBox, styles.iconError]}>
        <Ionicons name="alert-circle-outline" size={24} color={colors.error} />
      </View>
      <Text style={styles.title}>Data belum bisa dimuat</Text>
      <Text style={styles.description}>{message}</Text>
      {onRetry ? <Button label="Coba lagi" variant="outline" icon="refresh" onPress={onRetry} /> : null}
    </View>
  );
}

/** Status kosong dengan aksi menuju layar yang memang ada. */
export function EmptyState({ icon = 'file-tray-outline', title, description, actionLabel, onAction }) {
  return (
    <View style={styles.block}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} variant="tonal" onPress={onAction} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  iconError: {
    backgroundColor: colors.errorContainer,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
