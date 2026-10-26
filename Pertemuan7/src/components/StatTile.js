import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';
import Card from './Card';

/** Kartu angka kecil. Nilai selalu berasal dari data produk milik pengguna sendiri. */
export default function StatTile({ label, value, icon, tone = 'default' }) {
  const iconColor = tone === 'featured' ? colors.featured : colors.primary;
  const iconBg = tone === 'featured' ? '#FFF3E0' : colors.primaryContainer;

  return (
    <Card style={styles.tile}>
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={16} color={iconColor} />
      </View>
      <Text
        style={styles.value}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.65}
      >
        {value}
      </Text>
      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    padding: spacing.md,
    gap: 6,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.text,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.textMuted,
  },
});
