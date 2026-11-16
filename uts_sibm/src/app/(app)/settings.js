import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { AppText } from '../../components/AppText';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SurfaceCard } from '../../components/ui/SurfaceCard';
import { useApp } from '../../context/AppContext';
import { colors, pagePadding, radii, spacing, withAlpha } from '../../theme';

function SettingRow({ iconName, label, value, valueColor }) {
  return (
    <View style={styles.row}>
      {iconName ? (
        <View style={styles.rowIcon}>
          <MaterialCommunityIcons
            accessibilityElementsHidden
            color={colors.primary[700]}
            importantForAccessibility="no-hide-descendants"
            name={iconName}
            size={20}
          />
        </View>
      ) : (
        <View style={styles.rowIconPlaceholder} />
      )}
      <AppText style={styles.rowLabel} variant="body">
        {label}
      </AppText>
      <AppText color={valueColor || colors.neutral.textPrimary} style={styles.rowValue} variant="bodyStrong">
        {value}
      </AppText>
    </View>
  );
}

function Section({ title, children, footnote }) {
  return (
    <View style={styles.section}>
      <AppText color={colors.neutral.textSecondary} style={styles.sectionTitle} variant="label">
        {title}
      </AppText>
      <SurfaceCard>{children}</SurfaceCard>
      {footnote ? (
        <AppText color={colors.neutral.textSecondary} style={styles.footnote} variant="caption">
          {footnote}
        </AppText>
      ) : null}
    </View>
  );
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { transactions, categories, currentUser } = useApp();

  return (
    <View style={styles.screen}>
      <ScreenHeader left="back" title="Pengaturan" />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.xxl },
        ]}
        persistentScrollbar
      >
        <Section title="Tampilan">
          <SettingRow iconName="palette-outline" label="Tema" value="Terang" />
          <View style={styles.divider} />
          <SettingRow
            iconName="weather-night"
            label="Mode gelap"
            value="Segera hadir"
            valueColor={colors.neutral.textSecondary}
          />
        </Section>

        <Section
          footnote="Data disimpan di perangkat ini. Menghapus data aplikasi akan menghapus seluruh isi aplikasi."
          title="Penyimpanan"
        >
          <SettingRow iconName="database-outline" label="Media" value="AsyncStorage" />
          <View style={styles.divider} />
          <SettingRow label="Transaksi tersimpan" value={transactions.length} />
          <View style={styles.divider} />
          <SettingRow label="Kategori tersimpan" value={categories.length} />
          <View style={styles.divider} />
          <SettingRow label="Akun di perangkat ini" value={currentUser ? 1 : 0} />
        </Section>

        <Section title="Jaringan">
          <SettingRow iconName="wifi-off" label="Koneksi internet" value="Tidak dibutuhkan" />
          <View style={styles.divider} />
          <SettingRow
            iconName="cloud-off-outline"
            label="Sinkronisasi antarperangkat"
            value="Tidak tersedia"
            valueColor={colors.neutral.textSecondary}
          />
        </Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingHorizontal: pagePadding,
    paddingTop: spacing.sm,
  },
  divider: {
    backgroundColor: withAlpha(colors.primary[950], 0.06),
    height: 1,
  },
  footnote: {
    marginTop: spacing.sm,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  rowIcon: {
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    borderRadius: radii.pill,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  rowIconPlaceholder: {
    height: 36,
    width: 36,
  },
  rowLabel: {
    flex: 1,
  },
  rowValue: {
    textAlign: 'right',
  },
  screen: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    marginLeft: spacing.xs,
  },
});
