import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Platform 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

// This would normally come from a cart context/redux store
const cartItems = [
  {
    id: '1',
    name: 'Premium Denim Jacket',
    price: '299.99',
    size: 'M',
    color: 'Black',
    quantity: 1,
    image: require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752e274.jpg'),
  },
  // Add more items as needed
];

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <View style={styles.cartItem}>
    <Image source={item.image} style={styles.itemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemMeta}>Size: {item.size} | Color: {item.color}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          <Icon name="minus" size={16} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Icon name="plus" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity 
      style={styles.removeButton}
      onPress={() => onRemove(item.id)}
    >
      <Icon name="x" size={20} color={colors.primary} />
    </TouchableOpacity>
  </View>
);

const CartTabScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [items, setItems] = React.useState(cartItems);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return items.reduce((sum, item) => 
      sum + (parseFloat(item.price) * item.quantity), 0
    ).toFixed(2);
  };

  if (items.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.header}>Shopping Cart</Text>
        <View style={styles.emptyState}>
          <Icon name="shopping-bag" size={48} color={colors.primary} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.navigate('Main', { screen: 'Home' })}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { 
      paddingTop: insets.top,
      paddingBottom: insets.bottom + 70,
    }]}>
      <Text style={styles.header}>Shopping Cart</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: 120 }
        ]}
      />
      {items.length > 0 && (
        <View style={[styles.footer]}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${getTotal()}</Text>
          </View>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontFamily: fonts.secondary.bold,
    fontSize: 28,
    color: colors.primary,
    padding: 16,
  },
  list: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontFamily: fonts.secondary.medium,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 4,
  },
  itemMeta: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.primary,
    opacity: 0.7,
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: fonts.primary.bold,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    color: colors.primary,
    marginHorizontal: 16,
  },
  removeButton: {
    padding: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontFamily: fonts.secondary.bold,
    fontSize: 18,
    color: colors.primary,
  },
  totalAmount: {
    fontFamily: fonts.secondary.bold,
    fontSize: 24,
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  checkoutText: {
    fontFamily: fonts.primary.bold,
    fontSize: 16,
    color: colors.secondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontFamily: fonts.secondary.medium,
    fontSize: 18,
    color: colors.primary,
    marginTop: 16,
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  shopButtonText: {
    fontFamily: fonts.primary.bold,
    fontSize: 16,
    color: colors.secondary,
  },
});

export default CartTabScreen; 