import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors, radii, spacing, withAlpha } from '../theme';
import { formatSignedCurrency } from '../utils/currency';
import { formatDateMedium } from '../utils/date';
import { AppText } from './AppText';
import { FocusablePressable } from './ui/FocusablePressable';

function toneFor(type) {
  return type === 'income' ? colors.semantic.income : colors.semantic.expense;
}

export function TransactionRow({ transaction, category, showDate = false, onPress }) {
  const isIncome = transaction.type === 'income';
  const tone = toneFor(transaction.type);
  const categoryLabel = category?.name || 'Tanpa kategori';
  const dateLabel = showDate ? ` • ${formatDateMedium(transaction.date)}` : '';
  const accessibilityLabel = `${transaction.note}, ${categoryLabel}, ${formatSignedCurrency(
    transaction.amount,
    transaction.type,
  )}`;

  return (
    <FocusablePressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      android_ripple={{ color: colors.primary[100] }}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View
        style={[
          styles.iconBubble,
          { backgroundColor: withAlpha(tone, isIncome ? 0.12 : 0.1) },
        ]}
      >
        <MaterialCommunityIcons
          accessibilityElementsHidden
          color={tone}
          importantForAccessibility="no-hide-descendants"
          name={category?.icon || 'dots-horizontal-circle-outline'}
          size={22}
        />
      </View>

      <View style={styles.body}>
        <AppText numberOfLines={1} variant="bodyStrong">
          {transaction.note}
        </AppText>
        <AppText
          color={colors.neutral.textSecondary}
          numberOfLines={1}
          style={styles.meta}
          variant="caption"
        >
          {`${categoryLabel}${dateLabel}`}
        </AppText>
      </View>

      <AppText color={tone} style={styles.amount} variant="amountSmall">
        {formatSignedCurrency(transaction.amount, transaction.type)}
      </AppText>
    </FocusablePressable>
  );
}

const styles = StyleSheet.create({
  amount: {
    textAlign: 'right',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  iconBubble: {
    alignItems: 'center',
    borderRadius: radii.pill,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  meta: {
    textTransform: 'capitalize',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 68,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  rowPressed: {
    backgroundColor: colors.primary[50],
  },
});
