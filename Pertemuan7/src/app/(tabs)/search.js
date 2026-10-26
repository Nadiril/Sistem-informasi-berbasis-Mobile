import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import ProductRow from '../../components/ProductRow';
import Screen from '../../components/Screen';
import TextField from '../../components/TextField';
import { EmptyState, ErrorBlock, LoadingBlock } from '../../components/StateBlocks';
import { CATEGORIES } from '../../constants/categories';
import { PRODUCTS_STATUS, useProducts } from '../../context/ProductsContext';
import { spacing } from '../../theme';

const STATUS_FILTERS = [
  { value: 'semua', label: 'Semua' },
  { value: 'unggulan', label: 'Unggulan' },
  { value: 'habis', label: 'Stok habis' },
];

const EMPTY_QUERY = { query: '', status: 'semua', category: '' };

export default function SearchScreen() {
  const { products, status, toggleFeatured, retry } = useProducts();
  const [filters, setFilters] = useState(EMPTY_QUERY);

  const results = useMemo(() => {
    const keyword = filters.query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesKeyword =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        String(product.description ?? '').toLowerCase().includes(keyword);

      const matchesStatus =
        filters.status === 'semua'
          ? true
          : filters.status === 'unggulan'
            ? product.featured
            : product.stock === 0;

      const matchesCategory = !filters.category || product.category === filters.category;

      return matchesKeyword && matchesStatus && matchesCategory;
    });
  }, [products, filters]);

  const isLoading = status === PRODUCTS_STATUS.LOADING;
  const hasError = status === PRODUCTS_STATUS.ERROR;
  const hasFilter =
    filters.query.trim() !== '' || filters.status !== 'semua' || filters.category !== '';

  function updateFilter(patch) {
    setFilters((current) => ({ ...current, ...patch }));
  }

  return (
    <Screen
      title="Pencarian"
      subtitle={isLoading ? 'Memuat...' : `${results.length} produk ditemukan`}
      contentContainerStyle={styles.content}
    >
      <TextField
        label="Cari produk"
        value={filters.query}
        onChangeText={(value) => updateFilter({ query: value })}
        onClear={() => updateFilter({ query: '' })}
        placeholder="Nama produk, kategori, atau deskripsi"
        leftIcon="search"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        containerStyle={styles.searchField}
      />

      <View style={styles.chipRow}>
        {STATUS_FILTERS.map((filter) => (
          <Chip
            key={filter.value}
            label={filter.label}
            selected={filters.status === filter.value}
            onPress={() => updateFilter({ status: filter.value })}
          />
        ))}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {CATEGORIES.map((category) => (
          <Chip
            key={category.value}
            label={category.value}
            selected={filters.category === category.value}
            onPress={() =>
              updateFilter({
                category: filters.category === category.value ? '' : category.value,
              })
            }
          />
        ))}
      </ScrollView>

      {isLoading ? (
        <LoadingBlock />
      ) : hasError ? (
        <ErrorBlock message="Daftar produk gagal dibaca dari penyimpanan perangkat." onRetry={retry} />
      ) : products.length === 0 ? (
        <EmptyState
          icon="cube-outline"
          title="Belum ada produk untuk dicari"
          description="Produk yang Anda tambahkan akan muncul di sini."
        />
      ) : results.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title="Tidak ada yang cocok"
          description="Coba kata kunci lain atau longgarkan filter yang aktif."
          actionLabel={hasFilter ? 'Hapus filter' : undefined}
          onAction={hasFilter ? () => setFilters(EMPTY_QUERY) : undefined}
        />
      ) : (
        <Card padded={false}>
          {results.map((product, index) => (
            <ProductRow
              key={product.id}
              product={product}
              onToggleFeatured={toggleFeatured}
              divider={index < results.length - 1}
            />
          ))}
        </Card>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
  searchField: {
    marginBottom: spacing.xs,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  categoryRow: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
});
