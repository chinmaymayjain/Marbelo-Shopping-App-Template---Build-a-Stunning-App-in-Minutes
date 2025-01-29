import React from 'react';
import { StyleSheet, View, FlatList, Text, ImageBackground, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { categories, categoryThumbnails } from '../data/products';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const CategoryGrid = ({ category, onPress }) => (
  <TouchableOpacity 
    style={styles.gridItem} 
    onPress={onPress}
    activeOpacity={0.9}
  >
    <ImageBackground 
      source={category.image} 
      style={styles.gridImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.gridOverlay}
      >
        <View style={styles.gridContent}>
          <Text style={styles.gridName}>{category.name}</Text>
          <Text style={styles.itemCount}>
            {category.products.length} Items
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  </TouchableOpacity>
);

const CategoriesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryGrid
            category={item}
            onPress={() => navigation.navigate('CategoryProducts', { category: item })}
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
    paddingBottom: 24,
  },
  headerTitle: {
    fontFamily: fonts.secondary.bold,
    fontSize: 32,
    color: colors.primary,
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  gridItem: {
    height: 180,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.border,
    width: '100%',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gridContent: {
    padding: 16,
  },
  gridName: {
    fontFamily: fonts.secondary.bold,
    fontSize: 24,
    color: colors.secondary,
    marginBottom: 4,
  },
  itemCount: {
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    color: colors.secondary,
    opacity: 0.8,
  },
});

export default CategoriesScreen; 