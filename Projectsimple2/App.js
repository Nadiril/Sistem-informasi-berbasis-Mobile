import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';

// =========================
// PRODUCT CARD
// =========================
const ProductCard = ({ product, onAdd }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.productCard,
        pressed && styles.pressed,
      ]}
      onPress={() => onAdd(product)}
    >
      <View style={styles.productIcon}>
        <Text style={styles.productEmoji}>{product.icon}</Text>
      </View>

      <Text style={styles.productName}>{product.name}</Text>

      <Text style={styles.productPrice}>
        Rp {product.price.toLocaleString('id-ID')}
      </Text>

      <View style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </View>
    </Pressable>
  );
};

// =========================
// CART ITEM
// =========================
const CartItem = ({ item, onIncrease, onDecrease }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.cartInfo}>
        <Text style={styles.cartName}>{item.name}</Text>

        <Text style={styles.cartPrice}>
          Rp {item.price.toLocaleString('id-ID')}
        </Text>
      </View>

      <View style={styles.quantityContainer}>
        <Pressable
          style={styles.quantityButton}
          onPress={() => onDecrease(item.id)}
        >
          <Text style={styles.quantityButtonText}>−</Text>
        </Pressable>

        <Text style={styles.quantity}>{item.quantity}</Text>

        <Pressable
          style={styles.quantityButton}
          onPress={() => onIncrease(item.id)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

// =========================
// MAIN APP
// =========================
export default function App() {
  const products = [
    {
      id: '1',
      name: 'Kopi',
      price: 12000,
      icon: '☕',
    },
    {
      id: '2',
      name: 'Nasi Goreng',
      price: 18000,
      icon: '🍚',
    },
    {
      id: '3',
      name: 'Mie Goreng',
      price: 15000,
      icon: '🍜',
    },
    {
      id: '4',
      name: 'Es Teh',
      price: 5000,
      icon: '🥤',
    },
    {
      id: '5',
      name: 'Roti',
      price: 8000,
      icon: '🍞',
    },
    {
      id: '6',
      name: 'Jus Jeruk',
      price: 10000,
      icon: '🍊',
    },
  ];

  const [cart, setCart] = useState([]);

  // Tambah produk
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // Tambah quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Kurangi quantity
  const decreaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);

    if (item.quantity === 1) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
      );
    }
  };

  // Hitung total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Total item
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Checkout
  const checkout = () => {
    if (cart.length === 0) {
      Alert.alert(
        'Keranjang Kosong',
        'Tambahkan produk terlebih dahulu.'
      );
      return;
    }

    Alert.alert(
      'Pembayaran Berhasil',
      `Total pembayaran Rp ${total.toLocaleString('id-ID')}`,
      [
        {
          text: 'OK',
          onPress: () => setCart([]),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Selamat datang 👋</Text>

          <Text style={styles.title}>
           Berkah Jaya
          </Text>
        </View>

        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>
            {totalItems}
          </Text>
        </View>
      </View>

      {/* PRODUCT */}
      <View style={styles.productHeader}>
        <Text style={styles.sectionTitle}>
          Produk
        </Text>

        <Text style={styles.productCount}>
          {products.length} produk
        </Text>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAdd={addToCart}
          />
        )}
      />

      {/* CART */}
      <View style={styles.bottomSheet}>

        <View style={styles.cartHeader}>
          <Text style={styles.sectionTitle}>
            Pesanan
          </Text>

          <Text style={styles.itemText}>
            {totalItems} item
          </Text>
        </View>

        {cart.length === 0 ? (
          <Text style={styles.emptyText}>
            Belum ada produk
          </Text>
        ) : (
          <View style={styles.cartList}>
            {cart.slice(0, 2).map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />
            ))}
          </View>
        )}

        {/* TOTAL */}
        <View style={styles.totalContainer}>
          <View>
            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.totalPrice}>
              Rp {total.toLocaleString('id-ID')}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.checkoutButton,
              pressed && styles.pressedButton,
            ]}
            onPress={checkout}
          >
            <Text style={styles.checkoutText}>
              Bayar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// =========================
// STYLES
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FA',
    paddingTop: 55,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  greeting: {
    fontSize: 14,
    color: '#6F6A75',
    marginBottom: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#211F26',
  },

  cartBadge: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#6750A4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // PRODUCT
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#211F26',
  },

  productCount: {
    fontSize: 13,
    color: '#77727E',
  },

  productList: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },

  column: {
    justifyContent: 'space-between',
  },

  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },

  pressed: {
    opacity: 0.7,
  },

  productIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F0EAF7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  productEmoji: {
    fontSize: 25,
  },

  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#211F26',
    marginBottom: 5,
  },

  productPrice: {
    fontSize: 14,
    color: '#6750A4',
    fontWeight: '600',
  },

  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6750A4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '500',
  },

  // BOTTOM CART
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    elevation: 10,
  },

  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  itemText: {
    fontSize: 13,
    color: '#77727E',
  },

  emptyText: {
    color: '#77727E',
    fontSize: 14,
    paddingVertical: 5,
  },

  cartList: {
    maxHeight: 130,
  },

  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  cartInfo: {
    flex: 1,
  },

  cartName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#211F26',
  },

  cartPrice: {
    fontSize: 12,
    color: '#77727E',
    marginTop: 3,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F0EAF7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButtonText: {
    fontSize: 18,
    color: '#6750A4',
    fontWeight: '600',
  },

  quantity: {
    width: 30,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#211F26',
  },

  // TOTAL
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E7E2EA',
    marginTop: 10,
    paddingTop: 14,
  },

  totalLabel: {
    fontSize: 12,
    color: '#77727E',
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#211F26',
    marginTop: 2,
  },

  checkoutButton: {
    backgroundColor: '#6750A4',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
  },

  pressedButton: {
    opacity: 0.7,
  },

  checkoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});