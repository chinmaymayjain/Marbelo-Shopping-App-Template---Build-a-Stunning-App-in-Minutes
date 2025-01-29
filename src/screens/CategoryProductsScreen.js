import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text, 
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import ProductCard from '../components/ProductCard';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const CategoryProductsScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const insets = useSafeAreaInsets();
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [products, setProducts] = useState(category.products);

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'newest', label: 'Newest First' },
    { id: 'priceHigh', label: 'Price: High to Low' },
    { id: 'priceLow', label: 'Price: Low to High' },
  ];

  const handleSort = (sortId) => {
    let sortedProducts = [...products];
    switch (sortId) {
      case 'priceHigh':
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'priceLow':
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    setProducts(sortedProducts);
    setSelectedSort(sortId);
    setShowSort(false);
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
        <Text style={styles.headerTitle}>{category.name}</Text>
      </View>

      <View style={styles.filterBar}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Icon name="sliders" size={20} color={colors.primary} />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => setShowSort(true)}
        >
          <Icon name="bar-chart-2" size={20} color={colors.primary} />
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
      />

      {/* Sort Modal */}
      <Modal
        visible={showSort}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSort(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setShowSort(false)}>
                <Icon name="x" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
            {sortOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.sortOption}
                onPress={() => handleSort(option.id)}
              >
                <Text style={[
                  styles.sortOptionText,
                  selectedSort === option.id && styles.selectedSortText
                ]}>
                  {option.label}
                </Text>
                {selectedSort === option.id && (
                  <Icon name="check" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.secondary.bold,
    fontSize: 20,
    color: colors.primary,
    marginHorizontal: 16,
  },
  filterBar: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  sortButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  filterButtonText: {
    marginLeft: 8,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    color: colors.primary,
  },
  sortButtonText: {
    marginLeft: 8,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    color: colors.primary,
  },
  productList: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: fonts.secondary.bold,
    fontSize: 20,
    color: colors.primary,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sortOptionText: {
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    color: colors.primary,
  },
  selectedSortText: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
  },
});

export default CategoryProductsScreen; 