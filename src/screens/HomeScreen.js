import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Text, Platform, Animated, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CarouselBanner from '../components/CarouselBanner';
import ProductCard from '../components/ProductCard';
import CategoryChip from '../components/CategoryChip';
import AnnouncementBar from '../components/AnnouncementBar';
import { bannerImages, products, categories } from '../data/products';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import HomeHeader from '../components/HomeHeader';
import HomeScreenSkeleton from '../components/skeletons/HomeScreenSkeleton';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setData(products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const renderProductGrid = (section) => (
    <View style={styles.productGrid}>
      {section.items.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </View>
  );

  const renderSectionHeader = (title, onViewMore) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity 
        style={styles.viewMoreButton}
        onPress={onViewMore}
      >
        <Text style={styles.viewMoreText}>View More</Text>
        <Icon name="arrow-right" size={18} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <HomeScreenSkeleton />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <HomeHeader />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AnnouncementBar />
        
        <View style={styles.bannerContainer}>
          <CarouselBanner images={bannerImages} />
        </View>

        <View style={styles.categoriesSection}>
          {renderSectionHeader('Categories', () => 
            navigation.navigate('Categories')
          )}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map(category => (
              <CategoryChip
                key={category.id}
                category={category}
                onPress={() => navigation.navigate('CategoryProducts', { category })}
              />
            ))}
          </ScrollView>
        </View>

        {data.map(section => (
          <View key={section.categoryName} style={styles.productSection}>
            {renderSectionHeader(section.categoryName, () => 
              navigation.navigate('CategoryProducts', { 
                category: {
                  name: section.categoryName,
                  products: section.items
                }
              })
            )}
            {renderProductGrid(section)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    backgroundColor: colors.background,
    zIndex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  bannerContainer: {
    marginBottom: 24,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.secondary.bold,
    fontSize: 24,
    color: colors.primary,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoriesScroll: {
    paddingHorizontal: 8,
  },
  productSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  productsScroll: {
    paddingHorizontal: 8,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  viewMoreText: {
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    color: colors.primary,
    marginRight: 6,
  },
});

export default HomeScreen; 