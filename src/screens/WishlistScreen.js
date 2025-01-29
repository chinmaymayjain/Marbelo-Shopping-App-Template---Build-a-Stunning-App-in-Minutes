import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Animated,
  Platform 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const WishlistItem = ({ item, onRemove, onAddToCart }) => {
  const scaleAnim = new Animated.Value(1);

  const handleAddToCart = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => onAddToCart(item));
  };

  return (
    <Animated.View style={[styles.wishlistItem, { transform: [{ scale: scaleAnim }] }]}>
      <Image source={item.images[0]} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Icon name="shopping-bag" size={16} color={colors.secondary} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => onRemove(item.id)}
      >
        <Icon name="x" size={20} color={colors.primary} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const WishlistScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const { items: wishlistItems, removeFromWishlist } = useWishlist();

  const handleRemove = (id) => {
    removeFromWishlist(id);
    global.showToast('Removed from wishlist');
  };

  const handleAddToCart = (item) => {
    addToCart(item, 'M');
    handleRemove(item.id);
    global.showToast('Added to cart');
  };

  if (wishlistItems.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wishlist</Text>
        </View>
        <View style={styles.emptyState}>
          <Icon name="heart" size={48} color={colors.primary} />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wishlist</Text>
      </View>
      <FlatList
        data={wishlistItems}
        renderItem={({ item }) => (
          <WishlistItem
            item={item}
            onRemove={handleRemove}
            onAddToCart={handleAddToCart}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontFamily: fonts.secondary.bold,
    fontSize: 28,
    color: colors.primary,
  },
  list: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  wishlistItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 16,
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
  itemPrice: {
    fontFamily: fonts.primary.bold,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 12,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 6,
  },
  addToCartText: {
    color: colors.secondary,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    marginLeft: 8,
  },
  removeButton: {
    padding: 8,
    position: 'absolute',
    top: 8,
    right: 8,
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

export default WishlistScreen; 