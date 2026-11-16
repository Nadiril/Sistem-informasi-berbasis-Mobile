import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { AppText } from '../../components/AppText';
import { ScreenHeader } from '../../components/ScreenHeader';
import { AppButton } from '../../components/ui/AppButton';
import { SurfaceCard } from '../../components/ui/SurfaceCard';
import { useApp } from '../../context/AppContext';
import { useFeedback } from '../../context/FeedbackProvider';
import { colors, pagePadding, radii, spacing, withAlpha } from '../../theme';
import { formatDateLong } from '../../utils/date';

function initialsOf(name) {
  return String(name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function StatTile({ label, value }) {
  return (
    <View style={styles.statTile}>
      <AppText variant="amount">{value}</AppText>
      <AppText color={colors.neutral.textSecondary} variant="caption">
        {label}
      </AppText>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { currentUser, transactions, categories, logout } = useApp();
  const { showFeedback } = useFeedback();

  const expenseCount = transactions.filter((item) => item.type === 'expense').length;
  const incomeCount = transactions.filter((item) => item.type === 'income').length;

  const handleLogout = () => {
    Alert.alert('Keluar dari akun?', 'Kamu bisa masuk kembali kapan saja dengan akun ini.', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          const result = await logout();

          if (result.ok) {
            router.replace('/login');
          } else {
            showFeedback(result.error || 'Gagal keluar. Coba lagi.', 'error');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader left="back" title="Profil pengguna" />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.xxl },
        ]}
        persistentScrollbar
      >
        <SurfaceCard style={styles.identityCard} variant="tonal">
          <View style={styles.avatar}>
            <AppText color={colors.primary[900]} variant="headline">
              {initialsOf(currentUser?.name)}
            </AppText>
          </View>
          <AppText style={styles.identityName} variant="title">
            {currentUser?.name}
          </AppText>
          <AppText color={colors.neutral.textSecondary} variant="body">
            {currentUser?.email}
          </AppText>
          <View style={styles.joinedRow}>
            <MaterialCommunityIcons
              accessibilityElementsHidden
              color={colors.primary[700]}
              importantForAccessibility="no-hide-descendants"
              name="calendar-check-outline"
              size={16}
            />
            <AppText color={colors.primary[800]} variant="caption">
              {`Bergabung sejak ${formatDateLong(String(currentUser?.createdAt || '').slice(0, 10))}`}
            </AppText>
          </View>
        </SurfaceCard>

        <SurfaceCard style={styles.statsCard}>
          <StatTile label="Total transaksi" value={transactions.length} />
          <View style={styles.statDivider} />
          <StatTile label="Pemasukan" value={incomeCount} />
          <View style={styles.statDivider} />
          <StatTile label="Pengeluaran" value={expenseCount} />
          <View style={styles.statDivider} />
          <StatTile label="Kategori" value={categories.length} />
        </SurfaceCard>

        <AppButton
          iconName="logout"
          label="Keluar dari akun"
          onPress={handleLogout}
          variant="danger"
        />

        <AppText color={colors.neutral.textSecondary} style={styles.note} variant="caption">
          Akun ini hanya tersimpan di perangkat ini. Menghapus data aplikasi akan menghapus akun
          beserta seluruh catatannya.
        </AppText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary[200],
    borderRadius: radii.pill,
    height: 88,
    justifyContent: 'center',
    width: 88,
  },
  content: {
    gap: spacing.lg,
    paddingHorizontal: pagePadding,
    paddingTop: spacing.sm,
  },
  identityCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  identityName: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
  joinedRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  note: {
    textAlign: 'center',
  },
  screen: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
  statDivider: {
    backgroundColor: withAlpha(colors.primary[950], 0.08),
    height: 40,
    width: 1,
  },
  statTile: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  statsCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    paddingVertical: spacing.lg,
  },
});
