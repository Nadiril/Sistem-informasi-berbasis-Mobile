import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ProductRow from '../../components/ProductRow';
import Screen from '../../components/Screen';
import SectionHeader from '../../components/SectionHeader';
import { EmptyState, ErrorBlock, LoadingBlock } from '../../components/StateBlocks';
import StatTile from '../../components/StatTile';
import { PRODUCTS_STATUS, useProducts } from '../../context/ProductsContext';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing, typography } from '../../theme';
import { formatCurrency, formatDate, getInitials, greetingByHour } from '../../utils/format';

const RECENT_LIMIT = 4;

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { products, status, stats, toggleFeatured, retry } = useProducts();

  const recent = products.slice(0, RECENT_LIMIT);
  const isLoading = status === PRODUCTS_STATUS.LOADING;
  const hasError = status === PRODUCTS_STATUS.ERROR;

  return (
    <Screen
      title={`${greetingByHour()}, ${user?.shopName ?? 'Toko Anda'}`}
      subtitle={formatDate(new Date().toISOString())}
      headerRight={
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(user?.shopName ?? 'Toko')}</Text>
        </View>
      }
      contentContainerStyle={styles.content}
    >
      <View style={styles.statRow}>
        <StatTile label="Produk" value={String(stats.total)} icon="cube-outline" />
        <StatTile label="Unggulan" value={String(stats.featured)} icon="star-outline" tone="featured" />
        <StatTile label="Nilai stok" value={formatCurrency(stats.stockValue)} icon="pricetag-outline" />
      </View>

      <Button
        label="Tambah produk"
        icon="add"
        onPress={() => router.navigate('/add')}
        accessibilityHint="Membuka form tambah produk"
      />

      <View style={styles.section}>
        <SectionHeader
          title="Terbaru"
          actionLabel={products.length > RECENT_LIMIT ? 'Lihat semua' : undefined}
          onAction={() => router.navigate('/search')}
        />

        {isLoading ? (
          <LoadingBlock />
        ) : hasError ? (
          <ErrorBlock message="Daftar produk gagal dibaca dari penyimpanan perangkat." onRetry={retry} />
        ) : products.length === 0 ? (
          <EmptyState
            icon="cube-outline"
            title="Belum ada produk"
            description="Tambahkan produk pertama toko Anda, lalu tandai yang paling laku sebagai unggulan."
            actionLabel="Tambah produk"
            onAction={() => router.navigate('/add')}
          />
        ) : (
          <Card padded={false}>
            {recent.map((product, index) => (
              <ProductRow
                key={product.id}
                product={product}
                onToggleFeatured={toggleFeatured}
                divider={index < recent.length - 1}
              />
            ))}
          </Card>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  statRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.label,
    fontSize: 15,
    color: colors.onPrimaryContainer,
  },
  section: {
    gap: spacing.md,
  },
});
