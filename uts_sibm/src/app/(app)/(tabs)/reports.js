import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BarChart } from 'react-native-chart-kit';

import { AppText } from '../../../components/AppText';
import { EmptyState } from '../../../components/AppStates';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { SegmentedControl } from '../../../components/ui/ChoiceChips';
import { IconButton } from '../../../components/ui/IconButton';
import { SurfaceCard } from '../../../components/ui/SurfaceCard';
import { useApp } from '../../../context/AppContext';
import { useTabBarInset } from '../../../hooks/useTabBarInset';
import { REPORT_PERIODS } from '../../../constants/categories';
import { colors, pagePadding, radii, spacing, withAlpha } from '../../../theme';
import { formatCompactCurrency, formatCurrency, formatPercent } from '../../../utils/currency';
import { formatPeriodLabel, shiftPeriod, todayKey } from '../../../utils/date';
import {
  buildCategoryBreakdown,
  buildReportChartData,
  calculateTotals,
  getTransactionsForPeriod,
} from '../../../utils/report';

const CHART_HEIGHT = 210;

function BreakdownRow({ item }) {
  return (
    <View style={styles.breakdownRow}>
      <View style={styles.breakdownTop}>
        <View style={styles.breakdownLabel}>
          <MaterialCommunityIcons
            accessibilityElementsHidden
            color={colors.primary[700]}
            importantForAccessibility="no-hide-descendants"
            name={item.category.icon}
            size={18}
          />
          <AppText numberOfLines={1} variant="bodyStrong">
            {item.category.name}
          </AppText>
        </View>
        <AppText variant="amountSmall">{formatCurrency(item.amount)}</AppText>
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(Math.max(item.percentage, 2), 100)}%` },
          ]}
        />
      </View>
      <AppText color={colors.neutral.textSecondary} variant="caption">
        {`${formatPercent(item.percentage)} dari total • ${item.count} transaksi`}
      </AppText>
    </View>
  );
}

export default function ReportsScreen() {
  const { width } = useWindowDimensions();
  const tabBarInset = useTabBarInset();
  const { transactions, categories } = useApp();

  const [period, setPeriod] = useState('monthly');
  const [anchorKey, setAnchorKey] = useState(todayKey());
  const [breakdownType, setBreakdownType] = useState('expense');

  const periodTransactions = useMemo(
    () => getTransactionsForPeriod(transactions, period, anchorKey),
    [transactions, period, anchorKey],
  );
  const totals = useMemo(() => calculateTotals(periodTransactions), [periodTransactions]);
  const chartRows = useMemo(
    () => buildReportChartData(periodTransactions, period, anchorKey),
    [periodTransactions, period, anchorKey],
  );
  const breakdown = useMemo(
    () => buildCategoryBreakdown(periodTransactions, categories, breakdownType),
    [periodTransactions, categories, breakdownType],
  );

  const hasData = periodTransactions.length > 0;
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

  const handlePeriodChange = (value) => {
    setPeriod(value);
    setAnchorKey(todayKey());
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader left="menu" subtitle="Ringkasan berdasarkan periode pilihanmu" title="Laporan" />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: tabBarInset + spacing.xl }]}
        persistentScrollbar
      >
        <SegmentedControl
          accessibilityLabel="Periode laporan"
          onChange={handlePeriodChange}
          options={REPORT_PERIODS}
          value={period}
        />

        <View style={styles.periodBar}>
          <IconButton
            accessibilityLabel="Periode sebelumnya"
            iconName="chevron-left"
            onPress={() => setAnchorKey((current) => shiftPeriod(current, period, -1))}
            variant="tonal"
          />
          <AppText style={styles.periodLabel} variant="section">
            {formatPeriodLabel(period, anchorKey)}
          </AppText>
          <IconButton
            accessibilityLabel="Periode berikutnya"
            iconName="chevron-right"
            onPress={() => setAnchorKey((current) => shiftPeriod(current, period, 1))}
            variant="tonal"
          />
        </View>

        <SurfaceCard style={styles.totalsCard}>
          <View style={styles.totalBlock}>
            <AppText color={colors.neutral.textSecondary} variant="caption">
              Pemasukan
            </AppText>
            <AppText color={colors.semantic.income} variant="amount">
              {formatCurrency(totals.income)}
            </AppText>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.totalBlock}>
            <AppText color={colors.neutral.textSecondary} variant="caption">
              Pengeluaran
            </AppText>
            <AppText color={colors.semantic.expense} variant="amount">
              {formatCurrency(totals.expense)}
            </AppText>
          </View>
        </SurfaceCard>

        <SurfaceCard
          style={styles.netCard}
          variant={totals.balance >= 0 ? 'tonal' : 'surface'}
        >
          <View style={styles.netRow}>
            <View style={styles.netLabel}>
              <MaterialCommunityIcons
                accessibilityElementsHidden
                color={totals.balance >= 0 ? colors.semantic.income : colors.semantic.expense}
                importantForAccessibility="no-hide-descendants"
                name={totals.balance >= 0 ? 'arrow-up-bold' : 'arrow-down-bold'}
                size={20}
              />
              <AppText variant="bodyStrong">Saldo bersih periode ini</AppText>
            </View>
            <AppText
              color={totals.balance >= 0 ? colors.semantic.income : colors.semantic.expense}
              variant="amount"
            >
              {formatCurrency(totals.balance)}
            </AppText>
          </View>
        </SurfaceCard>

        <SurfaceCard style={styles.block}>
          <View style={styles.blockHeader}>
            <AppText variant="section">Grafik transaksi</AppText>
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
              iconName="chart-bar"
              message="Belum ada pemasukan atau pengeluaran pada periode ini. Gunakan panah kiri dan kanan untuk ganti periode."
              style={styles.embeddedState}
              title="Belum ada data periode ini"
            />
          )}
        </SurfaceCard>

        <SurfaceCard style={styles.block}>
          <View style={styles.blockHeader}>
            <AppText variant="section">Ringkasan kategori</AppText>
          </View>
          <SegmentedControl
            accessibilityLabel="Jenis ringkasan kategori"
            onChange={setBreakdownType}
            options={[
              { value: 'expense', label: 'Pengeluaran' },
              { value: 'income', label: 'Pemasukan' },
            ]}
            value={breakdownType}
          />

          {breakdown.length > 0 ? (
            <View style={styles.breakdownList}>
              {breakdown.map((item) => (
                <BreakdownRow item={item} key={item.categoryId} />
              ))}
            </View>
          ) : (
            <EmptyState
              iconName="tag-multiple-outline"
              message={`Tidak ada transaksi ${breakdownType === 'expense' ? 'pengeluaran' : 'pemasukan'} pada periode ini.`}
              style={styles.embeddedState}
              title="Belum ada ringkasan"
            />
          )}
        </SurfaceCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  blockHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  breakdownLabel: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minWidth: 0,
  },
  breakdownList: {
    gap: spacing.lg,
  },
  breakdownRow: {
    gap: spacing.xs,
  },
  breakdownTop: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  chart: {
    borderRadius: radii.sm,
  },
  content: {
    gap: spacing.lg,
    paddingHorizontal: pagePadding,
    paddingTop: spacing.sm,
  },
  embeddedState: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    paddingVertical: spacing.lg,
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
  netCard: {
    marginTop: 0,
  },
  netLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  netRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  periodBar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  periodLabel: {
    flex: 1,
    textAlign: 'center',
  },
  progressFill: {
    backgroundColor: colors.primary[600],
    borderRadius: 4,
    height: '100%',
  },
  progressTrack: {
    backgroundColor: colors.neutral.surfaceVariant,
    borderRadius: 4,
    height: 6,
    overflow: 'hidden',
    width: '100%',
  },
  screen: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
  totalBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  totalDivider: {
    backgroundColor: withAlpha(colors.primary[950], 0.08),
    height: 44,
    width: 1,
  },
  totalsCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
});
