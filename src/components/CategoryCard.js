import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions, Image } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const CategoryCard = ({ category, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={category.image} style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.name}>{category.name}</Text>
        </View>
      </Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardWidth * 1.2,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.secondary.bold,
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'center',
    padding: 16,
  },
});

export default CategoryCard; 