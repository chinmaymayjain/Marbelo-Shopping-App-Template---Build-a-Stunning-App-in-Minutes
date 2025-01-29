import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Text, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  Platform,
  FlatList 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import Icon from 'react-native-vector-icons/Feather';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const SizeSelector = ({ sizes, selectedSize, onSelect }) => (
  <View style={styles.sizeContainer}>
    <Text style={styles.sectionTitle}>Select Size</Text>
    <View style={styles.sizeGrid}>
      {sizes.map(size => (
        <TouchableOpacity
          key={size}
          style={[
            styles.sizeButton,
            selectedSize === size && styles.selectedSize
          ]}
          onPress={() => onSelect(size)}
        >
          <Text style={[
            styles.sizeText,
            selectedSize === size && styles.selectedSizeText
          ]}>{size}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const QuantitySelector = ({ quantity, onUpdate }) => (
  <View style={styles.quantityContainer}>
    <Text style={styles.sectionTitle}>Quantity</Text>
    <View style={styles.quantityControls}>
      <TouchableOpacity 
        style={styles.quantityButton}
        onPress={() => quantity > 1 && onUpdate(quantity - 1)}
      >
        <Icon name="minus" size={20} color={colors.primary} />
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity 
        style={styles.quantityButton}
        onPress={() => onUpdate(quantity + 1)}
      >
        <Icon name="plus" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  </View>
);

const StarRating = ({ rating }) => (
  <View style={styles.ratingContainer}>
    {[1, 2, 3, 4, 5].map(star => (
      <Icon
        key={star}
        name={star <= rating ? 'star' : 'star'}
        size={16}
        color={star <= rating ? '#FFD700' : colors.border}
        style={styles.star}
      />
    ))}
  </View>
);

const ReviewItem = ({ review }) => (
  <View style={styles.reviewItem}>
    <View style={styles.reviewHeader}>
      <Text style={styles.reviewerName}>{review.name}</Text>
      <StarRating rating={review.rating} />
    </View>
    <Text style={styles.reviewDate}>{review.date}</Text>
    <Text style={styles.reviewText}>{review.text}</Text>
  </View>
);

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    global.showToast('Added to cart');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wishlistButton}>
          <Icon name="heart" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Carousel
          loop
          width={width}
          height={width * 1.2}
          autoPlay={true}
          data={product.images}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image
              source={item}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        />

        <View style={styles.details}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceRatingRow}>
            <Text style={styles.price}>${product.price}</Text>
            <StarRating rating={4.5} />
          </View>
          
          <SizeSelector 
            sizes={['XS', 'S', 'M', 'L', 'XL']}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />
          
          <QuantitySelector 
            quantity={quantity}
            onUpdate={setQuantity}
          />

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {/* Add reviews list here */}
          </View>

          <View style={styles.relatedSection}>
            <Text style={styles.sectionTitle}>Related Products</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.relatedScroll}
            >
              {/* Add related products here */}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>
            Add to Cart - ${(product.price * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    padding: 20,
  },
  category: {
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    color: colors.primary,
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  name: {
    fontFamily: fonts.secondary.bold,
    fontSize: 24,
    color: colors.primary,
    marginBottom: 12,
  },
  price: {
    fontFamily: fonts.primary.bold,
    fontSize: 28,
    color: colors.primary,
    marginBottom: 16,
  },
  description: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: colors.primary,
    opacity: 0.8,
    lineHeight: 24,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontFamily: fonts.primary.bold,
    fontSize: 16,
    color: colors.secondary,
    letterSpacing: 1,
  },
  content: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  sizeContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: fonts.primary.bold,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 8,
  },
  sizeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeButton: {
    width: '23%',
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: colors.primary,
  },
  selectedSize: {
    backgroundColor: colors.primary,
  },
  selectedSizeText: {
    color: colors.secondary,
  },
  quantityContainer: {
    marginBottom: 20,
  },
  quantityControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  reviewsSection: {
    marginBottom: 20,
  },
  relatedSection: {
    marginBottom: 20,
  },
  relatedScroll: {
    flexDirection: 'row',
  },
  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default ProductDetailsScreen; 