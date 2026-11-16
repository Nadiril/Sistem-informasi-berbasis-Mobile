const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
});

const decimalFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});

export function formatNumber(value) {
  return rupiahFormatter.format(Number(value) || 0);
}

export function formatCurrency(value) {
  const amount = Number(value) || 0;
  const sign = amount < 0 ? '-' : '';

  return `${sign}Rp ${rupiahFormatter.format(Math.abs(amount))}`;
}

export function formatSignedCurrency(value, type) {
  const prefix = type === 'income' ? '+' : '-';
  return `${prefix}${formatCurrency(Math.abs(Number(value) || 0))}`;
}

export function formatCompactNumber(value) {
  const amount = Math.abs(Number(value) || 0);

  if (amount >= 1_000_000_000) {
    return `${decimalFormatter.format(amount / 1_000_000_000)} M`;
  }

  if (amount >= 1_000_000) {
    return `${decimalFormatter.format(amount / 1_000_000)} jt`;
  }

  if (amount >= 1_000) {
    return `${decimalFormatter.format(amount / 1_000)} rb`;
  }

  return rupiahFormatter.format(amount);
}

export function formatCompactCurrency(value) {
  return `Rp ${formatCompactNumber(value)}`;
}

export function digitsToNumber(text) {
  const digits = String(text ?? '').replace(/\D/g, '');
  return digits ? Number.parseInt(digits, 10) : 0;
}

export function formatAmountInput(text) {
  const digits = String(text ?? '').replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  return digits ? rupiahFormatter.format(Number.parseInt(digits, 10)) : '';
}

export function formatPercent(value) {
  return `${Math.round(Number(value) || 0)}%`;
}
