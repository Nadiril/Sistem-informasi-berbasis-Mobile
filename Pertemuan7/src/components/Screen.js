import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';

/**
 * Kerangka layar: jarak aman atas, judul opsional, konten, dan footer opsional.
 * keyboardShouldPersistTaps="handled" dipakai supaya ketukan di luar input
 * tidak menutup keyboard saat form belum selesai diisi.
 *
 * insetBottom=true hanya untuk layar yang TIDAK punya tab bar di bawahnya
 * (misalnya login). Layar tab tidak boleh memakainya karena tab bar sudah
 * menambahkan insets.bottom sendiri, kalau dipakai berdua jadi dobel.
 */
export default function Screen({
  title,
  subtitle,
  headerRight,
  children,
  scroll = true,
  footer,
  insetBottom = false,
  contentContainerStyle,
  style,
}) {
  const insets = useSafeAreaInsets();
  const hasHeader = Boolean(title || subtitle || headerRight);
  const bottomInset = insetBottom ? insets.bottom : 0;

  return (
    <View style={[styles.root, { paddingTop: insets.top }, style]}>
      {hasHeader ? (
        <View style={styles.header}>
          <View style={styles.headerText}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {headerRight}
        </View>
      ) : null}

      {scroll ? (
        <ScrollView
          contentContainerStyle={[
            styles.content,
            bottomInset ? { paddingBottom: spacing.xxl + bottomInset } : null,
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.content,
            bottomInset ? { paddingBottom: spacing.xxl + bottomInset } : null,
            contentContainerStyle,
          ]}
        >
          {children}
        </View>
      )}

      {footer ? (
        <View style={[styles.footer, bottomInset ? { paddingBottom: spacing.lg + bottomInset } : null]}>
          {footer}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.display,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
