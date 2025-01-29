import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const CategoryChip = ({ category, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={category.image} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.text}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: fonts.primary.medium,
    fontSize: 12,
    color: colors.primary,
    textAlign: 'center',
  },
});

export default CategoryChip; 