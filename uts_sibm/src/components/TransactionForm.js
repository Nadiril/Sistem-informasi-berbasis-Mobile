import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors, radii, spacing, withAlpha } from '../theme';
import { digitsToNumber, formatAmountInput, formatCurrency } from '../utils/currency';
import { todayKey } from '../utils/date';
import { AppText } from './AppText';
import { AppButton } from './ui/AppButton';
import { AppTextInput } from './ui/AppTextInput';
import { Chip, SegmentedControl } from './ui/ChoiceChips';
import { DatePickerField } from './ui/DatePickerField';

const TYPE_OPTIONS = [
  { value: 'expense', label: 'Pengeluaran' },
  { value: 'income', label: 'Pemasukan' },
];

const EMPTY_INITIAL_VALUES = {};

export function TransactionForm({
  categories,
  initialValues = EMPTY_INITIAL_VALUES,
  submitLabel = 'Simpan',
  onSubmit,
}) {
  const [type, setType] = useState(initialValues.type || 'expense');
  const [amountText, setAmountText] = useState(
    initialValues.amount ? formatAmountInput(String(initialValues.amount)) : '',
  );
  const [categoryId, setCategoryId] = useState(initialValues.categoryId || '');
  const [date, setDate] = useState(initialValues.date || todayKey());
  const [note, setNote] = useState(initialValues.note || '');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const availableCategories = categories.filter((category) => category.type === type);
  const typedAmount = digitsToNumber(amountText);

  const clearFieldError = (field) => {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleTypeChange = (nextType) => {
    setType(nextType);
    setFieldErrors({});
    setFormError(null);

    const selected = categories.find((category) => category.id === categoryId);

    if (!selected || selected.type !== nextType) {
      setCategoryId('');
    }
  };

  const handleSubmit = async () => {
    setFormError(null);
    setSubmitting(true);

    try {
      const result = await onSubmit({
        type,
        amount: typedAmount,
        categoryId,
        date,
        note,
      });

      if (result.ok) {
        setFieldErrors({});
        return;
      }

      setFieldErrors(result.fieldErrors || {});
      setFormError(result.error || null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.block}>
        <AppText color={colors.neutral.textSecondary} style={styles.blockLabel} variant="label">
          Jenis transaksi
        </AppText>
        <SegmentedControl
          accessibilityLabel="Jenis transaksi"
          onChange={handleTypeChange}
          options={TYPE_OPTIONS}
          value={type}
        />
        {fieldErrors.type ? (
          <AppText color={colors.semantic.error} style={styles.inlineError} variant="caption">
            {fieldErrors.type}
          </AppText>
        ) : null}
      </View>

      <AppTextInput
        error={fieldErrors.amount}
        helperText={typedAmount > 0 ? formatCurrency(typedAmount) : 'Masukkan nominal transaksi'}
        keyboardType="numeric"
        label="Nominal"
        maxLength={19}
        onChangeText={(text) => {
          setAmountText(formatAmountInput(text));
          clearFieldError('amount');
        }}
        placeholder="0"
        prefix="Rp"
        returnKeyType="done"
        value={amountText}
      />

      <View style={styles.block}>
        <AppText color={colors.neutral.textSecondary} style={styles.blockLabel} variant="label">
          Kategori
        </AppText>
        {availableCategories.length > 0 ? (
          <View style={styles.categoryGrid}>
            {availableCategories.map((category) => (
              <Chip
                iconName={category.icon}
                key={category.id}
                label={category.name}
                onPress={() => {
                  setCategoryId(category.id);
                  clearFieldError('categoryId');
                }}
                selected={category.id === categoryId}
              />
            ))}
          </View>
        ) : (
          <AppText color={colors.neutral.textSecondary} variant="body">
            Belum ada kategori untuk jenis transaksi ini.
          </AppText>
        )}
        {fieldErrors.categoryId ? (
          <AppText color={colors.semantic.error} style={styles.inlineError} variant="caption">
            {fieldErrors.categoryId}
          </AppText>
        ) : null}
      </View>

      <DatePickerField
        error={fieldErrors.date}
        helperText="Ubah bila pencatatan dilakukan terlambat"
        label="Tanggal"
        onChange={(nextDate) => {
          setDate(nextDate);
          clearFieldError('date');
        }}
        value={date}
      />

      <AppTextInput
        error={fieldErrors.note}
        label="Deskripsi"
        maxLength={80}
        multiline
        numberOfLines={2}
        onChangeText={(text) => {
          setNote(text);
          clearFieldError('note');
        }}
        placeholder="Contoh: Makan siang di kantor"
        value={note}
      />

      {formError ? (
        <AppText
          accessibilityLiveRegion="assertive"
          color={colors.semantic.error}
          style={styles.formError}
          variant="body"
        >
          {formError}
        </AppText>
      ) : null}

      <AppButton label={submitLabel} loading={submitting} onPress={handleSubmit} variant="primary" />

      <View style={styles.note}>
        <MaterialCommunityIcons
          accessibilityElementsHidden
          color={colors.neutral.textSecondary}
          importantForAccessibility="no-hide-descendants"
          name="database-outline"
          size={14}
        />
        <AppText color={colors.neutral.textSecondary} style={styles.noteText} variant="caption">
          Data disimpan di perangkat ini.
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: spacing.sm,
  },
  blockLabel: {
    marginLeft: 2,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  form: {
    gap: spacing.xl,
  },
  formError: {
    backgroundColor: withAlpha(colors.semantic.error, 0.08),
    borderColor: withAlpha(colors.semantic.error, 0.3),
    borderRadius: radii.sm,
    borderWidth: 1,
    padding: spacing.md,
  },
  inlineError: {
    marginLeft: 2,
  },
  note: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  noteText: {
    flexShrink: 1,
    textAlign: 'center',
  },
});
