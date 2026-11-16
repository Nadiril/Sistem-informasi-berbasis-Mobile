import { useMemo } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Link, router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BarChart } from 'react-native-chart-kit';

import { AppText } from '../../../components/AppText';
import { EmptyState } from '../../../components/AppStates';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { Fab } from '../../../components/ui/Fab';
import { SurfaceCard } from '../../../components/ui/SurfaceCard';
import { TransactionRow } from '../../../components/TransactionRow';
import { useApp } from '../../../context/AppContext';
import { useTabBarInset } from '../../../hooks/useTabBarInset';
import { colors, fabClearance, pagePadding, radii, spacing, withAlpha } from '../../../theme';
import { formatCompactCurrency, formatCurrency } from '../../../utils/currency';
import { formatDateWithWeekday, todayKey } from '../../../utils/date';
import {
  buildDashboardChartData,
  calculateTotals,
  sortTransactionsNewestFirst,
} from '../../../utils/report';

const RECENT_LIMIT = 5;
const CHART_HEIGHT = 196;

function greetingForDate(date = new Date()) {
  const hour = date.getHours();

  if (hour < 11) {
    return 'Selamat pagi';
  }

  if (hour < 15) {
    return 'Selamat siang';
  }

  if (hour < 18) {
    return 'Selamat sore';
  }

  return 'Selamat malam';
}

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const tabBarInset = useTabBarInset();
  const { currentUser, transactions, categories } = useApp();

  const totals = useMemo(() => calculateTotals(transactions), [transactions]);
  const chartRows = useMemo(() => buildDashboardChartData(transactions), [transactions]);
  const recent = useMemo(
    () => sortTransactionsNewestFirst(transactions).slice(0, RECENT_LIMIT),
    [transactions],
  );
  const categoryById = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );

  const firstName = String(currentUser?.name || '').split(' ')[0];
  const hasData = transactions.length > 0;
  const chartWidth = Math.max(width - pagePadding * 2 - spacing.lg * 2, 240);

  const chartData = {
    labels: chartRows.map((row) => row.label),
    datasets: [
      {
        data: chartRows.map((row) => row.income),
        color: () => colors.semantic.income,
        key: 'income',
      },
      {
        data: chartRows.map((row) => row.expense),
        color: () => colors.semantic.expense,
        key: 'expense',
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.neutral.surface,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: colors.neutral.surface,
    backgroundGradientToOpacity: 1,
    barPercentage: 0.7,
    barRadius: 4,
    color: () => colors.semantic.income,
    decimalPlaces: 0,
    labelColor: () => colors.neutral.textSecondary,
    propsForBackgroundLines: {
      stroke: withAlpha(colors.primary[950], 0.08),
      strokeWidth: 1,
    },
    propsForLabels: { fontSize: 10 },
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader
        left="menu"
        subtitle={formatDateWithWeekday(todayKey())}
        title={`${greetingForDate()}, ${firstName || 'there'}`}
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: tabBarInset + fabClearance },
        ]}
        persistentScrollbar
      >
        <SurfaceCard elevated variant="dark" style={styles.balanceCard}>
          <AppText color={colors.primary[300]} variant="label">
            Total saldo
          </AppText>
          <AppText color={colors.primary[50]} numberOfLines={1} style={styles.balance} variant="display">
            {formatCurrency(totals.balance)}
          </AppText>
          <View style={styles.balanceMeta}>
            <MaterialCommunityIcons
              accessibilityElementsHidden
              color={colors.primary[300]}
              importantForAccessibility="no-hide-descendants"
              name="database-outline"
              size={14}
            />
            <AppText color={colors.primary[200]} variant="caption">
              Dihitung dari {transactions.length} transaksi tersimpan
            </AppText>
          </View>
        </SurfaceCard>

        <View style={styles.summaryRow}>
          <SurfaceCard style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.incomeIcon]}>
              <MaterialCommunityIcons
                accessibilityElementsHidden
                color={colors.semantic.income}
                importantForAccessibility="no-hide-descendants"
                name="trending-up"
                size={20}
              />
            </View>
            <AppText color={colors.neutral.textSecondary} variant="label">
              Pemasukan
            </AppText>
            <AppText color={colors.semantic.income} numberOfLines={1} variant="amountSmall">
              {formatCurrency(totals.income)}
            </AppText>
          </SurfaceCard>

          <SurfaceCard style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.expenseIcon]}>
              <MaterialCommunityIcons
                accessibilityElementsHidden
                color={colors.semantic.expense}
                importantForAccessibility="no-hide-descendants"
                name="trending-down"
                size={20}
              />
            </View>
            <AppText color={colors.neutral.textSecondary} variant="label">
              Pengeluaran
            </AppText>
            <AppText color={colors.semantic.expense} numberOfLines={1} variant="amountSmall">
              {formatCurrency(totals.expense)}
            </AppText>
          </SurfaceCard>
        </View>

        <SurfaceCard style={styles.block}>
          <View style={styles.blockHeader}>
            <AppText variant="section">7 hari terakhir</AppText>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.semantic.income }]} />
                <AppText color={colors.neutral.textSecondary} variant="caption">
                  Masuk
                </AppText>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.semantic.expense }]} />
                <AppText color={colors.neutral.textSecondary} variant="caption">
                  Keluar
                </AppText>
              </View>
            </View>
          </View>

          {hasData ? (
            <BarChart
              chartConfig={chartConfig}
              data={chartData}
              fromZero
              formatYLabel={(value) => formatCompactCurrency(Number(value)).replace('Rp ', '')}
              height={CHART_HEIGHT}
              segments={3}
              style={styles.chart}
              width={chartWidth}
              withInnerLines
              withVerticalLabels
              yAxisLabel=""
              yAxisSuffix=""
            />
          ) : (
            <EmptyState
              message="Setiap transaksi yang kamu catat akan muncul sebagai grafik di sini."
              style={styles.embeddedState}
              title="Belum ada data grafik"
            />
          )}
        </SurfaceCard>

        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <AppText variant="section">Aktivitas terbaru</AppText>
            {hasData ? (
              <Link href="/transactions">
                <AppText color={colors.primary[700]} style={styles.blockLink} variant="label">
                  Lihat semua
                </AppText>
              </Link>
            ) : null}
          </View>

          {recent.length > 0 ? (
            <SurfaceCard padded={false}>
              {recent.map((transaction, index) => (
                <View
                  key={transaction.id}
                  style={index > 0 ? styles.rowDivider : undefined}
                >
                  <TransactionRow
                    category={categoryById.get(transaction.categoryId)}
                    onPress={() => router.push(`/transaction/${transaction.id}`)}
                    showDate
                    transaction={transaction}
                  />
                </View>
              ))}
            </SurfaceCard>
          ) : (
            <EmptyState
              actionLabel="Catat transaksi pertama"
              iconName="plus-circle-outline"
              message="Mulai dari pemasukan atau pengeluaran kecil, saldo akan terhitung otomatis."
              onAction={() => router.push('/transaction/new')}
              title="Belum ada transaksi"
            />
          )}
        </View>
      </ScrollView>

      <Fab
        onPress={() => router.push('/transaction/new')}
        style={{ bottom: tabBarInset + spacing.md }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  balance: {
    letterSpacing: -1.2,
    marginTop: spacing.sm,
  },
  balanceCard: {
    marginTop: spacing.sm,
  },
  balanceMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  block: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  blockHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  blockLink: {
    textDecorationLine: 'underline',
  },
  chart: {
    borderRadius: radii.sm,
    marginLeft: -spacing.sm,
  },
  content: {
    paddingHorizontal: pagePadding,
  },
  embeddedState: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    paddingVertical: spacing.lg,
  },
  expenseIcon: {
    backgroundColor: withAlpha(colors.semantic.expense, 0.1),
  },
  incomeIcon: {
    backgroundColor: withAlpha(colors.semantic.income, 0.12),
  },
  legend: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  legendDot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  legendItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  rowDivider: {
    borderTopColor: withAlpha(colors.primary[950], 0.06),
    borderTopWidth: 1,
  },
  screen: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
  summaryCard: {
    alignItems: 'flex-start',
    flex: 1,
    gap: spacing.xs,
  },
  summaryIcon: {
    alignItems: 'center',
    borderRadius: radii.pill,
    height: 36,
    justifyContent: 'center',
    marginBottom: spacing.xs,
    width: 36,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
});
