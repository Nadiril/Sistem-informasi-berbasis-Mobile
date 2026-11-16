import { ScrollView, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors, radii, spacing, withAlpha } from '../../theme';
import { AppText } from '../AppText';
import { FocusablePressable } from './FocusablePressable';

export function Chip({ label, iconName, selected = false, onPress, style }) {
  const iconColor = selected ? '#FFFFFF' : colors.primary[700];

  return (
    <FocusablePressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : styles.chipIdle,
        pressed && styles.chipPressed,
        style,
      ]}
    >
      {iconName ? (
        <MaterialCommunityIcons
          accessibilityElementsHidden
          color={iconColor}
          importantForAccessibility="no-hide-descendants"
          name={iconName}
          size={16}
        />
      ) : null}
      <AppText
        color={selected ? '#FFFFFF' : colors.neutral.textPrimary}
        numberOfLines={1}
        style={styles.chipLabel}
        variant="label"
      >
        {label}
      </AppText>
    </FocusablePressable>
  );
}

export function SegmentedControl({ options, value, onChange, accessibilityLabel, style }) {
  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="radiogroup"
      style={[styles.segmented, style]}
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <FocusablePressable
            accessibilityLabel={option.label}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              styles.segment,
              selected && styles.segmentSelected,
              pressed && styles.segmentPressed,
            ]}
          >
            {option.iconName ? (
              <MaterialCommunityIcons
                accessibilityElementsHidden
                color={selected ? '#FFFFFF' : colors.neutral.textPrimary}
                importantForAccessibility="no-hide-descendants"
                name={option.iconName}
                size={17}
              />
            ) : null}
            <AppText
              color={selected ? '#FFFFFF' : colors.neutral.textPrimary}
              numberOfLines={1}
              style={styles.segmentLabel}
              variant="label"
            >
              {option.label}
            </AppText>
          </FocusablePressable>
        );
      })}
    </View>
  );
}

export function FilterChips({ options, value, onChange, style }) {
  return (
    <ScrollView
      contentContainerStyle={[styles.chipRow, style]}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {options.map((option) => (
        <Chip
          iconName={option.iconName}
          key={option.value}
          label={option.label}
          onPress={() => onChange(option.value)}
          selected={option.value === value}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs + 2,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 14,
  },
  chipIdle: {
    backgroundColor: colors.neutral.surface,
    borderColor: withAlpha(colors.primary[950], 0.14),
  },
  chipPressed: {
    opacity: 0.82,
  },
  chipRow: {
    gap: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  chipLabel: {
    flexShrink: 1,
  },
  segment: {
    alignItems: 'center',
    borderRadius: radii.pill,
    flexDirection: 'row',
    flex: 1,
    gap: spacing.xs + 2,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: spacing.sm,
  },
  segmentLabel: {
    flexShrink: 1,
    textAlign: 'center',
  },
  segmentPressed: {
    opacity: 0.85,
  },
  segmentSelected: {
    backgroundColor: colors.primary[600],
  },
  segmented: {
    backgroundColor: colors.neutral.surfaceVariant,
    borderRadius: radii.pill,
    flexDirection: 'row',
    gap: spacing.xs,
    padding: spacing.xs,
  },
});
