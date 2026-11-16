import { ScrollView, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../../../components/AppText';
import { ErrorState, LoadingState } from '../../../components/AppStates';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { TransactionForm } from '../../../components/TransactionForm';
import { useApp } from '../../../context/AppContext';
import { useFeedback } from '../../../context/FeedbackProvider';
import { colors, pagePadding, spacing } from '../../../theme';

export default function EditTransactionScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { phase, transactions, categories, updateTransaction } = useApp();
  const { showFeedback } = useFeedback();

  const transactionId = Array.isArray(id) ? id[0] : id;
  const transaction = transactions.find((item) => item.id === transactionId) || null;

  const handleSubmit = async (draft) => {
    if (!transaction) {
      return { ok: false, error: 'Transaksi tidak ditemukan.' };
    }

    const result = await updateTransaction(transaction.id, draft);

    if (result.ok) {
      showFeedback('Transaksi diperbarui.');
      router.back();
    }

    return result;
  };

  if (phase === 'loading') {
    return (
      <View style={styles.screen}>
        <ScreenHeader left="back" title="Ubah transaksi" />
        <LoadingState fullScreen={false} label="Memuat transaksi..." />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={styles.screen}>
        <ScreenHeader left="back" title="Ubah transaksi" />
        <ErrorState
          actionLabel="Kembali"
          message="Transaksi sudah dihapus atau tidak tersedia untuk akun ini."
          onAction={() => router.replace('/transactions')}
          title="Transaksi tidak ditemukan"
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader left="back" title="Ubah transaksi" />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.xxl },
        ]}
        keyboardShouldPersistTaps="handled"
        persistentScrollbar
      >
        <AppText color={colors.neutral.textSecondary} style={styles.intro} variant="body">
          Perubahan langsung menghitung ulang saldo dan laporan.
        </AppText>
        <TransactionForm
          categories={categories}
          initialValues={{
            type: transaction.type,
            amount: transaction.amount,
            categoryId: transaction.categoryId,
            date: transaction.date,
            note: transaction.note,
          }}
          onSubmit={handleSubmit}
          submitLabel="Simpan perubahan"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: pagePadding,
    paddingTop: spacing.sm,
  },
  intro: {
    marginBottom: spacing.xl,
  },
  screen: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
});
