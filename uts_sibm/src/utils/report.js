import {
  addDays,
  compareDateKeys,
  endOfMonthKey,
  formatPeriodLabel,
  formatShortDay,
  getPeriodRange,
  MONTH_NAMES_SHORT,
  parseDateKey,
  startOfMonthKey,
  toDateKey,
  todayKey,
} from './date';

export function calculateTotals(transactions) {
  return transactions.reduce(
    (totals, transaction) => {
      if (transaction.type === 'income') {
        totals.income += Number(transaction.amount) || 0;
      } else {
        totals.expense += Number(transaction.amount) || 0;
      }

      totals.balance = totals.income - totals.expense;
      return totals;
    },
    { income: 0, expense: 0, balance: 0 },
  );
}

export function filterTransactionsByRange(transactions, start, end) {
  return transactions.filter(
    (transaction) =>
      compareDateKeys(transaction.date, start) >= 0 &&
      compareDateKeys(transaction.date, end) <= 0,
  );
}

export function getTransactionsForPeriod(transactions, period, anchorKey) {
  const range = getPeriodRange(period, anchorKey);
  return filterTransactionsByRange(transactions, range.start, range.end);
}

export function buildDashboardChartData(transactions, anchorKey = todayKey(), days = 7) {
  const rows = [];

  for (let index = days - 1; index >= 0; index -= 1) {
    const dateKey = addDays(anchorKey, -index);
    const dayTransactions = transactions.filter((transaction) => transaction.date === dateKey);
    const totals = calculateTotals(dayTransactions);

    rows.push({
      label: formatShortDay(dateKey),
      fullLabel: dateKey,
      income: totals.income,
      expense: totals.expense,
    });
  }

  return rows;
}

function buildMonthlyBuckets(transactions, anchorKey) {
  const monthStart = startOfMonthKey(anchorKey);
  const monthEnd = endOfMonthKey(anchorKey);
  const buckets = [];
  let bucketStart = monthStart;
  let bucketIndex = 0;

  while (compareDateKeys(bucketStart, monthEnd) <= 0) {
    const bucketEndCandidate = addDays(bucketStart, 6);
    const bucketEnd =
      compareDateKeys(bucketEndCandidate, monthEnd) > 0 ? monthEnd : bucketEndCandidate;

    const bucketTransactions = filterTransactionsByRange(
      transactions,
      bucketStart,
      bucketEnd,
    );
    const totals = calculateTotals(bucketTransactions);
    const startDay = parseDateKey(bucketStart).getDate();
    const endDay = parseDateKey(bucketEnd).getDate();

    buckets.push({
      label: `${startDay}-${endDay}`,
      fullLabel: `${startDay}-${endDay}`,
      income: totals.income,
      expense: totals.expense,
    });

    bucketIndex += 1;
    bucketStart = addDays(bucketStart, 7);

    if (bucketIndex > 6) {
      break;
    }
  }

  return buckets;
}

export function buildReportChartData(transactions, period, anchorKey) {
  if (period === 'daily') {
    const totals = calculateTotals(
      transactions.filter((transaction) => transaction.date === anchorKey),
    );

    return [
      {
        label: 'Total',
        fullLabel: formatPeriodLabel(period, anchorKey),
        income: totals.income,
        expense: totals.expense,
      },
    ];
  }

  if (period === 'weekly') {
    const range = getPeriodRange(period, anchorKey);
    const rows = [];

    for (let index = 0; index < 7; index += 1) {
      const dateKey = addDays(range.start, index);
      const totals = calculateTotals(
        transactions.filter((transaction) => transaction.date === dateKey),
      );

      rows.push({
        label: formatShortDay(dateKey),
        fullLabel: dateKey,
        income: totals.income,
        expense: totals.expense,
      });
    }

    return rows;
  }

  if (period === 'monthly') {
    return buildMonthlyBuckets(transactions, anchorKey);
  }

  const year = parseDateKey(anchorKey).getFullYear();

  return MONTH_NAMES_SHORT.map((label, monthIndex) => {
    const monthTransactions = transactions.filter((transaction) => {
      const date = parseDateKey(transaction.date);
      return date.getFullYear() === year && date.getMonth() === monthIndex;
    });
    const totals = calculateTotals(monthTransactions);

    return {
      label,
      fullLabel: `${label} ${year}`,
      income: totals.income,
      expense: totals.expense,
    };
  });
}

export function buildCategoryBreakdown(transactions, categories, type) {
  const summaryMap = new Map();

  transactions
    .filter((transaction) => transaction.type === type)
    .forEach((transaction) => {
      const current = summaryMap.get(transaction.categoryId) || {
        categoryId: transaction.categoryId,
        amount: 0,
        count: 0,
      };

      current.amount += Number(transaction.amount) || 0;
      current.count += 1;
      summaryMap.set(transaction.categoryId, current);
    });

  const total = Array.from(summaryMap.values()).reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  return Array.from(summaryMap.values())
    .map((item) => {
      const category = categories.find((entry) => entry.id === item.categoryId);

      return {
        ...item,
        category: category || {
          id: item.categoryId,
          name: 'Tanpa kategori',
          icon: 'dots-horizontal-circle-outline',
          type,
        },
        percentage: total > 0 ? (item.amount / total) * 100 : 0,
      };
    })
    .sort((first, second) => second.amount - first.amount);
}

export function groupTransactionsByDate(transactions) {
  const sorted = [...transactions].sort((first, second) => {
    const dateComparison = compareDateKeys(second.date, first.date);

    if (dateComparison !== 0) {
      return dateComparison;
    }

    return String(second.createdAt || '').localeCompare(String(first.createdAt || ''));
  });
  const groups = new Map();

  sorted.forEach((transaction) => {
    const group = groups.get(transaction.date) || [];
    group.push(transaction);
    groups.set(transaction.date, group);
  });

  return Array.from(groups.entries()).map(([date, items]) => ({
    date,
    transactions: items,
  }));
}

export function getCategoryUsageCount(transactions, categoryId) {
  return transactions.filter((transaction) => transaction.categoryId === categoryId).length;
}

export function sortTransactionsNewestFirst(transactions) {
  return [...transactions].sort((first, second) => {
    const dateComparison = compareDateKeys(second.date, first.date);

    if (dateComparison !== 0) {
      return dateComparison;
    }

    return String(second.createdAt || '').localeCompare(String(first.createdAt || ''));
  });
}

export function getCurrentMonthRange(referenceDate = new Date()) {
  const dateKey = toDateKey(referenceDate);
  return {
    start: startOfMonthKey(dateKey),
    end: endOfMonthKey(dateKey),
  };
}
