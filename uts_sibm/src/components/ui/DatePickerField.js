import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontFamilies, radii, shadows, spacing, withAlpha } from '../../theme';
import {
  formatDateLong,
  getCalendarGrid,
  MONTH_NAMES,
  parseDateKey,
  todayKey,
} from '../../utils/date';
import { AppText } from '../AppText';
import { FocusablePressable } from './FocusablePressable';
import { IconButton } from './IconButton';

const WEEKDAY_LABELS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const SHEET_MAX_WIDTH = 340;
const MIN_CELL_SIZE = 28;
const MAX_CELL_SIZE = 32;

function startCursor(dateKey) {
  const date = parseDateKey(dateKey || todayKey());
  return { year: date.getFullYear(), month: date.getMonth() };
}

function shiftCursor(cursor, delta) {
  const next = new Date(cursor.year, cursor.month + delta, 1);
  return { year: next.getFullYear(), month: next.getMonth() };
}

function cellSizeFor(windowWidth) {
  const sheetWidth = Math.min(windowWidth - spacing.lg * 2, SHEET_MAX_WIDTH);
  const usableWidth = sheetWidth - spacing.md * 2;
  const fitted = Math.floor(usableWidth / WEEKDAY_LABELS.length);

  return Math.max(MIN_CELL_SIZE, Math.min(MAX_CELL_SIZE, fitted));
}

function weekCountFor(year, monthIndex) {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  return Math.ceil((leadingBlanks + daysInMonth) / WEEKDAY_LABELS.length);
}

export function DatePickerField({
  label = 'Tanggal',
  value,
  onChange,
  error,
  helperText,
  style,
}) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [cursor, setCursor] = useState(() => startCursor(value));
  const selectedKey = value || todayKey();
  const cellSize = cellSizeFor(width);
  const weekCount = weekCountFor(cursor.year, cursor.month);

  const handleOpen = () => {
    setCursor(startCursor(selectedKey));
    setVisible(true);
  };

  const handleSelect = (dateKey) => {
    onChange(dateKey);
    setVisible(false);
  };

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <AppText color={colors.neutral.textSecondary} style={styles.label} variant="label">
          {label}
        </AppText>
      ) : null}

      <FocusablePressable
        accessibilityHint="Membuka kalender untuk memilih tanggal"
        accessibilityLabel={label}
        accessibilityRole="button"
        onPress={handleOpen}
        style={({ pressed }) => [
          styles.field,
          Boolean(error) && styles.fieldError,
          pressed && styles.fieldPressed,
        ]}
      >
        <MaterialCommunityIcons
          accessibilityElementsHidden
          color={colors.neutral.textSecondary}
          importantForAccessibility="no-hide-descendants"
          name="calendar-outline"
          size={20}
        />
        <AppText numberOfLines={1} style={styles.fieldValue} variant="body">
          {formatDateLong(selectedKey)}
        </AppText>
        <MaterialCommunityIcons
          accessibilityElementsHidden
          color={colors.primary[700]}
          importantForAccessibility="no-hide-descendants"
          name="chevron-down"
          size={20}
        />
      </FocusablePressable>

      {error ? (
        <AppText
          accessibilityLiveRegion="polite"
          color={colors.semantic.error}
          style={styles.message}
          variant="caption"
        >
          {error}
        </AppText>
      ) : helperText ? (
        <AppText color={colors.neutral.textSecondary} style={styles.message} variant="caption">
          {helperText}
        </AppText>
      ) : null}

      <Modal
        animationType="fade"
        onRequestClose={() => setVisible(false)}
        statusBarTranslucent
        transparent
        visible={visible}
      >
        <Pressable
          accessibilityLabel="Tutup kalender"
          onPress={() => setVisible(false)}
          style={styles.backdrop}
        />
        <View pointerEvents="box-none" style={styles.sheetLayer}>
          <View
            accessibilityViewIsModal
            style={[styles.sheet, { paddingBottom: insets.bottom + spacing.md }]}
          >
            <View style={styles.sheetHeader}>
              <IconButton
                accessibilityLabel="Bulan sebelumnya"
                iconName="chevron-left"
                onPress={() => setCursor((current) => shiftCursor(current, -1))}
                size={44}
                variant="tonal"
              />
              <AppText variant="section">
                {`${MONTH_NAMES[cursor.month]} ${cursor.year}`}
              </AppText>
              <IconButton
                accessibilityLabel="Bulan berikutnya"
                iconName="chevron-right"
                onPress={() => setCursor((current) => shiftCursor(current, 1))}
                size={44}
                variant="tonal"
              />
            </View>

            <View style={styles.weekRow}>
              {WEEKDAY_LABELS.map((day) => (
                <View key={day} style={[styles.weekCell, { width: cellSize }]}>
                  <AppText color={colors.neutral.textSecondary} variant="caption">
                    {day}
                  </AppText>
                </View>
              ))}
            </View>

            <View style={styles.grid}>
              {getCalendarGrid(cursor.year, cursor.month)
                .slice(0, weekCount * WEEKDAY_LABELS.length)
                .map((cell) => {
                  const isSelected = cell.dateKey === selectedKey;
                  const isToday = cell.dateKey === todayKey();

                  return (
                    <FocusablePressable
                      accessibilityLabel={formatDateLong(cell.dateKey)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                      key={cell.dateKey}
                      onPress={() => handleSelect(cell.dateKey)}
                      style={({ pressed }) => [
                        styles.cell,
                        { height: cellSize, width: cellSize },
                        isSelected && styles.cellSelected,
                        !isSelected && isToday && styles.cellToday,
                        pressed && !isSelected && styles.cellPressed,
                      ]}
                    >
                      <AppText
                        color={
                          isSelected
                            ? '#FFFFFF'
                            : cell.isCurrentMonth
                              ? colors.neutral.textPrimary
                              : colors.neutral.textSecondary
                        }
                        style={styles.cellLabel}
                        variant="label"
                      >
                        {cell.dayNumber}
                      </AppText>
                    </FocusablePressable>
                  );
                })}
            </View>

            <View style={styles.sheetFooter}>
              <FocusablePressable
                accessibilityLabel="Pilih tanggal hari ini"
                accessibilityRole="button"
                onPress={() => handleSelect(todayKey())}
                style={({ pressed }) => [styles.footerButton, pressed && styles.footerButtonPressed]}
              >
                <AppText color={colors.primary[700]} variant="button">
                  Hari ini
                </AppText>
              </FocusablePressable>
              <FocusablePressable
                accessibilityLabel="Tutup kalender"
                accessibilityRole="button"
                onPress={() => setVisible(false)}
                style={({ pressed }) => [styles.footerButton, pressed && styles.footerButtonPressed]}
              >
                <AppText color={colors.neutral.textSecondary} variant="button">
                  Tutup
                </AppText>
              </FocusablePressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: withAlpha(colors.primary[950], 0.45),
  },
  cell: {
    alignItems: 'center',
    borderRadius: radii.pill,
    justifyContent: 'center',
  },
  cellLabel: {
    fontFamily: fontFamilies.medium,
  },
  cellPressed: {
    backgroundColor: colors.primary[100],
  },
  cellSelected: {
    backgroundColor: colors.primary[600],
  },
  cellToday: {
    borderColor: colors.primary[600],
    borderWidth: 1,
  },
  container: {
    gap: spacing.sm,
  },
  field: {
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    borderColor: withAlpha(colors.primary[950], 0.16),
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 54,
    paddingHorizontal: spacing.lg,
  },
  fieldError: {
    borderColor: colors.semantic.error,
  },
  fieldPressed: {
    backgroundColor: colors.neutral.surfaceVariant,
  },
  fieldValue: {
    flex: 1,
  },
  footerButton: {
    alignItems: 'center',
    borderRadius: radii.sm,
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: spacing.md,
  },
  footerButtonPressed: {
    backgroundColor: colors.primary[100],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 2,
  },
  message: {
    marginLeft: 2,
  },
  sheet: {
    alignSelf: 'center',
    backgroundColor: colors.neutral.surface,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    maxWidth: SHEET_MAX_WIDTH,
    padding: spacing.md,
    width: '100%',
    ...shadows.floating,
  },
  sheetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  sheetHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  sheetLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
  },
  weekCell: {
    alignItems: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
