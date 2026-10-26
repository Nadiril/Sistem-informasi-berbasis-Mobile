import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { iconForCategory } from '../constants/categories';
import { colors, spacing } from '../theme';
import { formatCurrency, formatNumber } from '../utils/format';

/**
 * Baris produk di dalam kartu daftar: kategori, nama, harga, stok, dan
 * sakelar unggulan. Barisnya sendiri tidak dapat diketuk supaya tidak ada
 * kontrol yang tampak bisa diklik tapi tidak melakukan apa pun.
 */
export default function ProductRow({ product, onToggleFeatured, divider = false }) {
  const outOfStock = product.stock === 0;
  const stockLabel = outOfStock ? 'Stok habis' : `Stok ${formatNumber(product.stock)}`;
  const featuredLabel = product.featured
    ? `Hapus ${product.name} dari unggulan`
    : `Tandai ${product.name} sebagai unggulan`;

  return (
    <View style={[styles.row, divider && styles.divider]}>
      <View style={styles.iconBox}>
        <Ionicons name={iconForCategory(product.category)} size={18} color={colors.primary} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>
          {product.isSample ? <Text style={styles.sampleTag}>Contoh</Text> : null}
        </View>

        <Text style={styles.price}>{formatCurrency(product.price)}</Text>

        <View style={styles.metaRow}>
          <Text style={[styles.stock, outOfStock && styles.stockOut]}>{stockLabel}</Text>
          <Text style={styles.metaDivider}>·</Text>
          <Text style={styles.category}>{product.category}</Text>
        </View>
      </View>

      <Pressable
        onPress={() => onToggleFeatured(product.id)}
        hitSlop={6}
        style={styles.starButton}
        accessibilityRole="switch"
        accessibilityState={{ checked: product.featured }}
        accessibilityLabel={featuredLabel}
      >
        <Ionicons
          name={product.featured ? 'star' : 'star-outline'}
          size={22}
          color={product.featured ? colors.featured : colors.textMuted}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    flexShrink: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.text,
  },
  sampleTag: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  stock: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
  },
  stockOut: {
    color: colors.error,
  },
  metaDivider: {
    fontSize: 12,
    color: colors.textFaint,
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
  },
  starButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
