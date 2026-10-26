import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Card from '../../components/Card';
import ProductRow from '../../components/ProductRow';
import Screen from '../../components/Screen';
import { EmptyState, ErrorBlock, LoadingBlock } from '../../components/StateBlocks';
import { PRODUCTS_STATUS, useProducts } from '../../context/ProductsContext';
import { spacing } from '../../theme';

export default function FeaturedScreen() {
  const router = useRouter();
  const { products, status, toggleFeatured, retry } = useProducts();

  const featuredList = products.filter((product) => product.featured);
  const isLoading = status === PRODUCTS_STATUS.LOADING;
  const hasError = status === PRODUCTS_STATUS.ERROR;

  return (
    <Screen
      title="Unggulan"
      subtitle={
        isLoading ? 'Memuat...' : `${featuredList.length} produk ditandai sebagai unggulan`
      }
      contentContainerStyle={styles.content}
    >
      {isLoading ? (
        <LoadingBlock />
      ) : hasError ? (
        <ErrorBlock message="Daftar produk gagal dibaca dari penyimpanan perangkat." onRetry={retry} />
      ) : featuredList.length === 0 ? (
        <EmptyState
          icon="star-outline"
          title="Belum ada unggulan"
          description="Ketuk ikon bintang pada produk di Beranda atau Pencarian untuk memasukkannya ke sini."
          actionLabel="Buka pencarian"
          onAction={() => router.navigate('/search')}
        />
      ) : (
        <View style={styles.list}>
          <Card padded={false}>
            {featuredList.map((product, index) => (
              <ProductRow
                key={product.id}
                product={product}
                onToggleFeatured={toggleFeatured}
                divider={index < featuredList.length - 1}
              />
            ))}
          </Card>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
  list: {
    gap: spacing.sm,
  },
});
