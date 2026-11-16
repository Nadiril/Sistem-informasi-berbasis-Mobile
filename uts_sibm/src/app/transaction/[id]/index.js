import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ErrorState, LoadingState } from '../../../components/AppStates';
import { AppText } from '../../../components/AppText';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { AppButton } from '../../../components/ui/AppButton';
import { SurfaceCard } from '../../../components/ui/SurfaceCard';
import { useApp } from '../../../context/AppContext';
import { useFeedback } from '../../../context/FeedbackProvider';
import { colors, pagePadding, radii, spacing, withAlpha } from '../../../theme';
import { formatSignedCurrency } from '../../../utils/currency';
import { formatDateWithWeekday } from '../../../utils/date';

function DetailRow({ label, value, valueColor }) {
  return (
    <View style={styles.detailRow}>
      <AppText color={colors.neutral.textSecondary} variant="body">
        {label}
      </AppText>
      <AppText color={valueColor || colors.neutral.textPrimary} style={styles.detailValue} variant="bodyStrong">
        {value}
      </AppText>
    </View>
  );
}

export default function TransactionDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { phase, transactions, categories, removeTransaction } = useApp();
  const { showFeedback } = useFeedback();
  const [deleting, setDeleting] = useState(false);

  const transactionId = Array.isArray(id) ? id[0] : id;
  const transaction = transactions.find((item) => item.id === transactionId) || null;
  const category = transaction
    ? categories.find((item) => item.id === transaction.categoryId) || null
    : null;
  const isIncome = transaction?.type === 'income';
  const tone = isIncome ? colors.semantic.income : colors.semantic.expense;

  const handleDelete = () => {
    if (!transaction) {
      return;
    }

    Alert.alert('Hapus transaksi?', `"${transaction.note}" akan dihapus permanen.`, [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          setDeleting(true);

          try {
            const result = await removeTransaction(transaction.id);

            if (result.ok) {
              showFeedback('Transaksi dihapus.');
              router.back();
            } else {
              showFeedback(result.error || 'Transaksi gagal dihapus.', 'error');
            }
          } finally {
            setDeleting(false);
          }
        },
      },
    ]);
  };

  if (phase === 'loading') {
    return (
      <View style={styles.screen}>
        <ScreenHeader left="back" title="Detail transaksi" />
        <LoadingState fullScreen={false} label="Memuat transaksi..." />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={styles.screen}>
        <ScreenHeader left="back" title="Detail transaksi" />
        <ErrorState
          actionLabel="Kembali ke daftar"
          message="Transaksi sudah dihapus atau tidak tersedia untuk akun ini."
          onAction={() => router.replace('/transactions')}
          title="Transaksi tidak ditemukan"
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader left="back" title="Detail transaksi" />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.xxl },
        ]}
        persistentScrollbar
      >
        <SurfaceCard style={styles.amountCard} variant={isIncome ? 'tonal' : 'surface'}>
          <View style={[styles.amountIcon, { backgroundColor: withAlpha(tone, 0.12) }]}>
            <MaterialCommunityIcons
              accessibilityElementsHidden
              color={tone}
              importantForAccessibility="no-hide-descendants"
              name={isIncome ? 'trending-up' : 'trending-down'}
              size={24}
            />
          </View>
          <AppText color={colors.neutral.textSecondary} variant="label">
            {isIncome ? 'Pemasukan' : 'Pengeluaran'}
          </AppText>
          <AppText color={tone} numberOfLines={1} style={styles.amount} variant="display">
            {formatSignedCurrency(transaction.amount, transaction.type)}
          </AppText>
        </SurfaceCard>

        <SurfaceCard style={styles.detailCard}>
          <DetailRow label="Deskripsi" value={transaction.note} />
          <View style={styles.detailDivider} />
          <DetailRow label="Kategori" value={category?.name || 'Tanpa kategori'} />
          <View style={styles.detailDivider} />
          <DetailRow label="Tanggal" value={formatDateWithWeekday(transaction.date)} />
          <View style={styles.detailDivider} />
          <DetailRow
            label="Dicatat"
            value={new Date(transaction.createdAt).toLocaleString('id-ID')}
          />
          {transaction.updatedAt !== transaction.createdAt ? (
            <>
              <View style={styles.detailDivider} />
              <DetailRow
                label="Terakhir diubah"
                value={new Date(transaction.updatedAt).toLocaleString('id-ID')}
              />
            </>
          ) : null}
        </SurfaceCard>

        <View style={styles.actions}>
          <AppButton
            iconName="pencil-outline"
            label="Ubah transaksi"
            onPress={() => router.push(`/transaction/${transaction.id}/edit`)}
            variant="outline"
          />
          <AppButton
            disabled={deleting}
            iconName="trash-can-outline"
            label="Hapus transaksi"
            onPress={handleDelete}
            variant="danger"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  amount: {
    marginTop: spacing.xs,
  },
  amountCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  amountIcon: {
    alignItems: 'center',
    borderRadius: radii.pill,
    height: 48,
    justifyContent: 'center',
    marginBottom: spacing.sm,
    width: 48,
  },
  content: {
    paddingHorizontal: pagePadding,
    paddingTop: spacing.sm,
  },
  detailCard: {
    gap: 0,
    marginTop: spacing.lg,
  },
  detailDivider: {
    backgroundColor: withAlpha(colors.primary[950], 0.06),
    height: 1,
    marginVertical: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    justifyContent: 'space-between',
  },
  detailValue: {
    flexShrink: 1,
    textAlign: 'right',
  },
  screen: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
});
