import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Skeleton from './Skeleton';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const ProductCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton width="100%" height={cardWidth * 1.4} style={styles.image} />
      <View style={styles.content}>
        <Skeleton width="80%" height={20} style={styles.title} />
        <Skeleton width="50%" height={18} style={styles.price} />
        <Skeleton width="100%" height={36} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    marginBottom: 8,
  },
  price: {
    marginBottom: 12,
  },
  button: {
    borderRadius: 6,
  },
});

export default ProductCardSkeleton; 