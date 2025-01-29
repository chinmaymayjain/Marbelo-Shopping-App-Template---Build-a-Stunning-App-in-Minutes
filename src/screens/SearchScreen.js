import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  FlatList, 
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const allProducts = categories.flatMap(cat => cat.products);

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recentSearches] = useState(['Denim Jacket', 'Black', 'Limited Edition']);

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
    if (text.trim()) {
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(text.toLowerCase()) ||
        product.category.toLowerCase().includes(text.toLowerCase()) ||
        product.description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, []);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
      <View style={styles.recentSearches}>
        {recentSearches.map((search, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.recentSearchItem}
            onPress={() => handleSearch(search)}
          >
            <Icon name="clock" size={16} color={colors.primary} />
            <Text style={styles.recentSearchText}>{search}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.suggestedTitle}>Popular Categories</Text>
      <View style={styles.suggestedCategories}>
        {categories.slice(0, 6).map(category => (
          <TouchableOpacity 
            key={category.id}
            style={styles.categoryChip}
            onPress={() => handleSearch(category.name)}
          >
            <Text style={styles.categoryChipText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={colors.primary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products, categories..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="rgba(0,0,0,0.5)"
          autoFocus
        />
        {searchQuery ? (
          <TouchableOpacity 
            onPress={() => handleSearch('')}
            style={styles.clearButton}
          >
            <Icon name="x" size={20} color={colors.primary} />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item, index }) => (
          <Animated.View 
            entering={Animated.FadeInDown.delay(index * 100)}
          >
            <ProductCard product={item} />
          </Animated.View>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={searchQuery ? (
          <Text style={styles.noResults}>No results found</Text>
        ) : renderEmptyState()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: colors.border,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: colors.primary,
  },
  productList: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  recentSearchesTitle: {
    fontFamily: fonts.primary.medium,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 12,
  },
  recentSearches: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  recentSearchText: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.primary,
    marginLeft: 4,
  },
  suggestedTitle: {
    fontFamily: fonts.primary.medium,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 12,
  },
  suggestedCategories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryChip: {
    padding: 8,
    backgroundColor: colors.border,
    borderRadius: 8,
  },
  categoryChipText: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.primary,
  },
  noResults: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default SearchScreen; 