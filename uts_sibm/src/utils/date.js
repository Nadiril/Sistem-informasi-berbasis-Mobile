export const MONTH_NAMES = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const MONTH_NAMES_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

export const WEEKDAY_NAMES = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
export const WEEKDAY_NAMES_SHORT = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

function pad(value) {
  return String(value).padStart(2, '0');
}

export function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayKey() {
  return toDateKey(new Date());
}

export function parseDateKey(dateKey) {
  if (typeof dateKey !== 'string') {
    return new Date();
  }

  const [year, month, day] = dateKey.split('-').map(Number);

  if (!year || !month || !day) {
    return new Date();
  }

  return new Date(year, month - 1, day);
}

export function isValidDateKey(dateKey) {
  if (typeof dateKey !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    return false;
  }

  const parsed = parseDateKey(dateKey);
  return toDateKey(parsed) === dateKey;
}

export function addDays(dateKey, amount) {
  const date = parseDateKey(dateKey);
  date.setDate(date.getDate() + amount);
  return toDateKey(date);
}

export function compareDateKeys(first, second) {
  return String(first).localeCompare(String(second));
}

export function startOfWeekKey(dateKey) {
  const date = parseDateKey(dateKey);
  const offset = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - offset);
  return toDateKey(date);
}

export function endOfWeekKey(dateKey) {
  return addDays(startOfWeekKey(dateKey), 6);
}

export function startOfMonthKey(dateKey) {
  const date = parseDateKey(dateKey);
  return toDateKey(new Date(date.getFullYear(), date.getMonth(), 1));
}

export function endOfMonthKey(dateKey) {
  const date = parseDateKey(dateKey);
  return toDateKey(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

export function getPeriodRange(period, anchorKey) {
  if (period === 'daily') {
    return { start: anchorKey, end: anchorKey };
  }

  if (period === 'weekly') {
    return { start: startOfWeekKey(anchorKey), end: endOfWeekKey(anchorKey) };
  }

  if (period === 'monthly') {
    return { start: startOfMonthKey(anchorKey), end: endOfMonthKey(anchorKey) };
  }

  const year = parseDateKey(anchorKey).getFullYear();
  return { start: `${year}-01-01`, end: `${year}-12-31` };
}

export function shiftPeriod(anchorKey, period, direction) {
  if (period === 'daily') {
    return addDays(anchorKey, direction);
  }

  if (period === 'weekly') {
    return addDays(anchorKey, direction * 7);
  }

  const date = parseDateKey(anchorKey);

  if (period === 'monthly') {
    return toDateKey(new Date(date.getFullYear(), date.getMonth() + direction, 1));
  }

  return toDateKey(new Date(date.getFullYear() + direction, 0, 1));
}

export function formatDateLong(dateKey) {
  const date = parseDateKey(dateKey);
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDateMedium(dateKey) {
  const date = parseDateKey(dateKey);
  return `${date.getDate()} ${MONTH_NAMES_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDateWithWeekday(dateKey) {
  const date = parseDateKey(dateKey);
  const weekday = WEEKDAY_NAMES[(date.getDay() + 6) % 7];
  return `${weekday}, ${formatDateLong(dateKey)}`;
}

export function formatMonthYear(dateKey) {
  const date = parseDateKey(dateKey);
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatMonthYearShort(dateKey) {
  const date = parseDateKey(dateKey);
  return `${MONTH_NAMES_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatWeekRange(anchorKey) {
  const start = parseDateKey(startOfWeekKey(anchorKey));
  const end = parseDateKey(endOfWeekKey(anchorKey));
  const startLabel = `${start.getDate()} ${MONTH_NAMES_SHORT[start.getMonth()]}`;
  const endLabel = `${end.getDate()} ${MONTH_NAMES_SHORT[end.getMonth()]} ${end.getFullYear()}`;
  return `${startLabel} - ${endLabel}`;
}

export function formatPeriodLabel(period, anchorKey) {
  if (period === 'daily') {
    return formatDateWithWeekday(anchorKey);
  }

  if (period === 'weekly') {
    return formatWeekRange(anchorKey);
  }

  if (period === 'monthly') {
    return formatMonthYear(anchorKey);
  }

  return String(parseDateKey(anchorKey).getFullYear());
}

export function formatRelativeDate(dateKey) {
  const today = todayKey();

  if (dateKey === today) {
    return 'Hari ini';
  }

  if (dateKey === addDays(today, -1)) {
    return 'Kemarin';
  }

  return formatDateLong(dateKey);
}

export function formatShortDay(dateKey) {
  const date = parseDateKey(dateKey);
  return WEEKDAY_NAMES_SHORT[(date.getDay() + 6) % 7];
}

export function getCalendarGrid(year, monthIndex) {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const weekdayOffset = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = new Date(year, monthIndex, 1 - weekdayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);

    return {
      date,
      dateKey: toDateKey(date),
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === monthIndex && date.getFullYear() === year,
    };
  });
}

export function isToday(dateKey) {
  return dateKey === todayKey();
}
