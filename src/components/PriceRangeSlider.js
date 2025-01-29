import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const PriceRangeSlider = ({ minPrice, maxPrice, currentRange, onRangeChange }) => {
  const priceRanges = [
    { min: 0, max: 250, label: '$0 - $250' },
    { min: 250, max: 500, label: '$250 - $500' },
    { min: 500, max: 750, label: '$500 - $750' },
    { min: 750, max: 1000, label: '$750 - $1000' },
    { min: 1000, max: null, label: '$1000+' },
  ];

  const isSelected = (min, max) => 
    currentRange[0] === min && currentRange[1] === (max || maxPrice);

  return (
    <View style={styles.container}>
      <View style={styles.rangeGrid}>
        {priceRanges.map((range, index) => (
          <Pressable
            key={index}
            style={[
              styles.rangeButton,
              isSelected(range.min, range.max) && styles.rangeButtonSelected
            ]}
            onPress={() => onRangeChange([range.min, range.max || maxPrice])}
          >
            <Text style={[
              styles.rangeText,
              isSelected(range.min, range.max) && styles.rangeTextSelected
            ]}>
              {range.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  rangeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  rangeButton: {
    width: '48%',
    margin: '1%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  rangeButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  rangeText: {
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    color: colors.primary,
  },
  rangeTextSelected: {
    color: colors.secondary,
  },
});

export default PriceRangeSlider; 