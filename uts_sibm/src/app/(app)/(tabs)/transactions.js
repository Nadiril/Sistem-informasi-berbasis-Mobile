import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { AppText } from '../../../components/AppText';
import { EmptyState } from '../../../components/AppStates';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { TransactionRow } from '../../../components/TransactionRow';
import { FilterChips } from '../../../components/ui/ChoiceChips';
import { DatePickerField } from '../../../components/ui/DatePickerField';
import { AppButton } from '../../../components/ui/AppButton';
import { Fab } from '../../../components/ui/Fab';
import { SurfaceCard } from '../../../components/ui/SurfaceCard';
import { useApp } from '../../../context/AppContext';
import { useTabBarInset } from '../../../hooks/useTabBarInset';
import { colors, fabClearance, pagePadding, spacing, withAlpha } from '../../../theme';
import { formatCurrency } from '../../../utils/currency';
import { formatRelativeDate, getPeriodRange, todayKey } from '../../../utils/date';
import {
  calculateTotals,
  filterTransactionsByRange,
  groupTransactionsByDate,
} from '../../../utils/report';

const TYPE_OPTIONS = [
  { value: 'all', label: 'Semua' },
  { value: 'expense', label: 'Pengeluaran' },
  { value: 'income', label: 'Pemasukan' },
];

const DATE_OPTIONS = [
  { value: 'all', label: 'Semua tanggal' },
  { value: 'today', label: 'Hari ini' },
  { value: 'weekly', label: 'Minggu ini' },
  { value: 'monthly', label: 'Bulan ini' },
  { value: 'custom', label: 'Pilih tanggal' },
];

function rangeForFilter(filter, customDate) {
  const today = todayKey();

  if (filter === 'custom') {
    return { start: customDate, end: customDate };
  }

  if (filter === 'all') {
    return null;
  }

  if (filter === 'today') {
    return { start: today, end: today };
  }

  return getPeriodRange(filter, today);
}

export default function TransactionsScreen() {
  const tabBarInset = useTabBarInset();
  const { transactions, categories } = useApp();

  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [customDate, setCustomDate] = useState(todayKey());

  const categoryOptions = useMemo(() => {
    const visible =
      typeFilter === 'all'
        ? categories
        : categories.filter((category) => category.type === typeFilter);

    return [
      { value: 'all', label: 'Semua kategori' },
      ...visible.map((category) => ({
        value: category.id,
        label: category.name,
        iconName: category.icon,
      })),
    ];
  }, [categories, typeFilter]);

  const filtered = useMemo(() => {
    const range = rangeForFilter(dateFilter, customDate);
    const inRange = range
      ? filterTransactionsByRange(transactions, range.start, range.end)
      : transactions;

    return inRange.filter((transaction) => {
      if (typeFilter !== 'all' && transaction.type !== typeFilter) {
        return false;
      }

      if (categoryFilter !== 'all' && transaction.categoryId !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [transactions, typeFilter, categoryFilter, dateFilter, customDate]);

  const groups = useMemo(() => groupTransactionsByDate(filtered), [filtered]);
  const totals = useMemo(() => calculateTotals(filtered), [filtered]);
  const categoryById = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );

  const hasAnyTransaction = transactions.length > 0;
  const hasActiveFilter =
    typeFilter !== 'all' || categoryFilter !== 'all' || dateFilter !== 'all';

  const handleTypeFilter = (value) => {
    setTypeFilter(value);

    if (value !== 'all' && categoryFilter !== 'all') {
      const category = categories.find((item) => item.id === categoryFilter);

      if (!category || category.type !== value) {
        setCategoryFilter('all');
      }
    }
  };

  const resetFilters = () => {
    setTypeFilter('all');
    setCategoryFilter('all');
    setDateFilter('all');
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader
        left="menu"
        subtitle={`${filtered.length} dari ${transactions.length} transaksi`}
        title="Transaksi"
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: tabBarInset + fabClearance },
        ]}
        persistentScrollbar
      >
        <SurfaceCard style={styles.filterCard}>
          <View style={styles.filterGroup}>
            <AppText color={colors.neutral.textSecondary} variant="label">
              Jenis
            </AppText>
            <FilterChips onChange={handleTypeFilter} options={TYPE_OPTIONS} value={typeFilter} />
          </View>

          <View style={styles.filterGroup}>
            <AppText color={colors.neutral.textSecondary} variant="label">
              Kategori
            </AppText>
            <FilterChips
              onChange={setCategoryFilter}
              options={categoryOptions}
              value={categoryFilter}
            />
          </View>

          <View style={styles.filterGroup}>
            <AppText color={colors.neutral.textSecondary} variant="label">
              Tanggal
            </AppText>
            <FilterChips onChange={setDateFilter} options={DATE_OPTIONS} value={dateFilter} />
            {dateFilter === 'custom' ? (
              <DatePickerField
                helperText="Transaksi hanya pada tanggal ini"
                label=""
                onChange={setCustomDate}
                value={customDate}
              />
            ) : null}
          </View>

          {hasActiveFilter ? (
            <AppButton
              fullWidth={false}
              label="Atur ulang filter"
              onPress={resetFilters}
              size="sm"
              variant="ghost"
            />
          ) : null}
        </SurfaceCard>

        <SurfaceCard style={styles.totalsCard}>
          <View style={styles.totalItem}>
            <AppText color={colors.neutral.textSecondary} variant="caption">
              Masuk
            </AppText>
            <AppText color={colors.semantic.income} variant="amountSmall">
              {formatCurrency(totals.income)}
            </AppText>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.totalItem}>
            <AppText color={colors.neutral.textSecondary} variant="caption">
              Keluar
            </AppText>
            <AppText color={colors.semantic.expense} variant="amountSmall">
              {formatCurrency(totals.expense)}
            </AppText>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.totalItem}>
            <AppText color={colors.neutral.textSecondary} variant="caption">
              Selisih
            </AppText>
            <AppText
              color={totals.balance >= 0 ? colors.semantic.income : colors.semantic.expense}
              variant="amountSmall"
            >
              {formatCurrency(totals.balance)}
            </AppText>
          </View>
        </SurfaceCard>

        {!hasAnyTransaction ? (
          <EmptyState
            actionLabel="Catat transaksi pertama"
            iconName="plus-circle-outline"
            message="Pemasukan dan pengeluaran yang kamu catat akan tampil berurutan di sini."
            onAction={() => router.push('/transaction/new')}
            title="Belum ada transaksi"
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            actionLabel="Atur ulang filter"
            iconName="filter-remove-outline"
            message="Tidak ada transaksi yang cocok dengan jenis, kategori, dan tanggal yang dipilih."
            onAction={resetFilters}
            title="Hasil kosong"
          />
        ) : (
          groups.map((group) => (
            <View key={group.date} style={styles.group}>
              <View style={styles.groupHeader}>
                <AppText variant="label">{formatRelativeDate(group.date)}</AppText>
                <AppText color={colors.neutral.textSecondary} variant="caption">
                  {formatCurrency(
                    group.transactions.reduce(
                      (sum, transaction) =>
                        sum +
                        (transaction.type === 'income'
                          ? Number(transaction.amount)
                          : -Number(transaction.amount)),
                      0,
                    ),
                  )}
                </AppText>
              </View>
              <SurfaceCard padded={false}>
                {group.transactions.map((transaction, index) => (
                  <View key={transaction.id} style={index > 0 ? styles.rowDivider : undefined}>
                    <TransactionRow
                      category={categoryById.get(transaction.categoryId)}
                      onPress={() => router.push(`/transaction/${transaction.id}`)}
                      transaction={transaction}
                    />
                  </View>
                ))}
              </SurfaceCard>
            </View>
          ))
        )}
      </ScrollView>

      <Fab
        onPress={() => router.push('/transaction/new')}
        style={{ bottom: tabBarInset + spacing.md }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingHorizontal: pagePadding,
    paddingTop: spacing.sm,
  },
  filterCard: {
    gap: spacing.lg,
  },
  filterGroup: {
    gap: spacing.sm,
  },
  group: {
    gap: spacing.sm,
  },
  groupHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
  },
  rowDivider: {
    borderTopColor: withAlpha(colors.primary[950], 0.06),
    borderTopWidth: 1,
  },
  screen: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
  totalDivider: {
    backgroundColor: withAlpha(colors.primary[950], 0.08),
    height: 36,
    width: 1,
  },
  totalItem: {
    alignItems: 'center',
    flex: 1,
    gap: 2,
  },
  totalsCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
});
