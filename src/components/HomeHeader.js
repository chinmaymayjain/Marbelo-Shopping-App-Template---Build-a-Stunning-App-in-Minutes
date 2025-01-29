import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { useCart } from '../context/CartContext';
import DrawerMenu from './DrawerMenu';

const HomeHeader = () => {
  const navigation = useNavigation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const handleSearchPress = () => {
    navigation.navigate('Main', { 
      screen: 'Search',
      initial: false
    });
  };

  const handleWishlistPress = () => {
    navigation.navigate('Wishlist');
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setIsDrawerVisible(true)}
        >
          <Icon name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.searchContainer}
          onPress={handleSearchPress}
          activeOpacity={0.9}
        >
          <Icon name="search" size={20} color={colors.primary} style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search products...</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={handleWishlistPress}
        >
          <Icon name="heart" size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon name="shopping-bag" size={24} color={colors.primary} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <DrawerMenu 
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        navigation={navigation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: colors.primary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.secondary,
    fontFamily: fonts.primary.bold,
    fontSize: 12,
    paddingHorizontal: 4,
  },
});

export default HomeHeader; 