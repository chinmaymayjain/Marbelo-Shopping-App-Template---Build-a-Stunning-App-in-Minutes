import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Skeleton from '../Skeleton';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

const HomeScreenSkeleton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header Skeleton */}
      <View style={styles.headerSkeleton}>
        <Skeleton width={width - 100} height={40} style={styles.searchBar} />
        <View style={styles.headerIcons}>
          <Skeleton width={40} height={40} style={styles.iconSkeleton} />
          <Skeleton width={40} height={40} style={styles.iconSkeleton} />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 }
        ]}
      >
        {/* Announcement Bar Skeleton */}
        <Skeleton width={width} height={40} style={styles.announcement} />

        {/* Banner Skeleton */}
        <View style={styles.bannerContainer}>
          <Skeleton width={width - 32} height={240} style={styles.banner} />
          <View style={styles.dotContainer}>
            {[1, 2, 3].map((_, index) => (
              <Skeleton
                key={index}
                width={8}
                height={8}
                style={styles.dot}
              />
            ))}
          </View>
        </View>

        {/* Categories Skeleton */}
        <View style={styles.categoriesContainer}>
          <Skeleton width={150} height={24} style={styles.sectionTitle} />
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {[1, 2, 3, 4].map((_, index) => (
              <View key={index} style={styles.categoryChip}>
                <Skeleton width={70} height={70} style={styles.categoryImage} />
                <Skeleton width={60} height={16} style={styles.categoryTitle} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Products Sections */}
        {[1, 2].map((section) => (
          <View key={section} style={styles.productsSection}>
            <Skeleton width={200} height={24} style={styles.sectionTitle} />
            <View style={styles.productsGrid}>
              {[1, 2, 3, 4].map((_, index) => (
                <View key={index} style={styles.productCard}>
                  <Skeleton width={(width - 48) / 2 - 16} height={200} style={styles.productImage} />
                  <Skeleton width={120} height={16} style={styles.productTitle} />
                  <Skeleton width={80} height={16} style={styles.productPrice} />
                </View>
              ))}
            </View>
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
  headerSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchBar: {
    borderRadius: 8,
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  iconSkeleton: {
    marginLeft: 8,
    borderRadius: 20,
  },
  announcement: {
    marginBottom: 16,
  },
  bannerContainer: {
    padding: 16,
    alignItems: 'center',
  },
  banner: {
    borderRadius: 16,
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  dot: {
    borderRadius: 4,
    marginHorizontal: 4,
  },
  categoriesContainer: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    borderRadius: 4,
  },
  categoriesScroll: {
    marginLeft: -8,
  },
  categoryChip: {
    marginHorizontal: 8,
    alignItems: 'center',
  },
  categoryImage: {
    borderRadius: 35,
    marginBottom: 8,
  },
  categoryTitle: {
    borderRadius: 4,
  },
  productsSection: {
    padding: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  productCard: {
    width: (width - 48) / 2,
    padding: 8,
    marginBottom: 16,
  },
  productImage: {
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    marginBottom: 4,
  },
  productPrice: {
    marginBottom: 8,
  },
});

export default HomeScreenSkeleton; 