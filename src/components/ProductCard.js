import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../hooks/useToast';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 48) / 2;
  const [isAdding, setIsAdding] = useState(false);
  const scaleAnim = new Animated.Value(1);
  const showToast = useToast();

  const handlePress = () => {
    navigation.navigate('ProductDetails', { product });
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    // Animation for button press
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
    ]).start();

    try {
      addToCart(product, 'M');
      showToast('Added to cart successfully');
    } catch (error) {
      showToast('Failed to add to cart', 'error');
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist');
    } else {
      addToWishlist(product);
      showToast('Added to wishlist');
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { width: cardWidth }]} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={product.images[0]} 
          style={[styles.image, { height: cardWidth * 1.4 }]} 
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.wishlistButton}
          onPress={handleWishlist}
        >
          <Icon 
            name={isInWishlist(product.id) ? "heart" : "heart"} 
            size={20} 
            color={isInWishlist(product.id) ? colors.error : colors.primary} 
            solid={isInWishlist(product.id)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity 
            style={[
              styles.addToCartButton,
              isAdding && styles.addToCartButtonDisabled
            ]}
            onPress={handleAddToCart}
            disabled={isAdding}
          >
            <Icon 
              name={isAdding ? "loader" : "shopping-bag"} 
              size={16} 
              color={colors.secondary} 
            />
            <Text style={styles.addToCartText}>
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    backgroundColor: colors.background,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  details: {
    padding: 12,
  },
  name: {
    fontFamily: fonts.secondary.medium,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 8,
    lineHeight: 22,
  },
  price: {
    fontFamily: fonts.primary.bold,
    fontSize: 18,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 6,
  },
  addToCartText: {
    color: colors.secondary,
    fontFamily: fonts.primary.medium,
    fontSize: 12,
    marginLeft: 4,
  },
  addToCartButtonDisabled: {
    opacity: 0.7,
  },
  imageContainer: {
    position: 'relative',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.background,
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default ProductCard; 