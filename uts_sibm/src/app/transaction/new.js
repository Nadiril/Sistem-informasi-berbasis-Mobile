import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../../components/AppText';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TransactionForm } from '../../components/TransactionForm';
import { useApp } from '../../context/AppContext';
import { useFeedback } from '../../context/FeedbackProvider';
import { colors, pagePadding, spacing } from '../../theme';

export default function NewTransactionScreen() {
  const insets = useSafeAreaInsets();
  const { categories, addTransaction } = useApp();
  const { showFeedback } = useFeedback();

  const handleSubmit = async (draft) => {
    const result = await addTransaction(draft);

    if (result.ok) {
      showFeedback('Transaksi tersimpan.');
      router.back();
    }

    return result;
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader left="back" title="Tambah transaksi" />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.xxl },
        ]}
        keyboardShouldPersistTaps="handled"
        persistentScrollbar
      >
        <AppText color={colors.neutral.textSecondary} style={styles.intro} variant="body">
          Isi detail transaksi. Saldo dan laporan ikut berubah begitu disimpan.
        </AppText>
        <TransactionForm categories={categories} onSubmit={handleSubmit} submitLabel="Simpan" />
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
