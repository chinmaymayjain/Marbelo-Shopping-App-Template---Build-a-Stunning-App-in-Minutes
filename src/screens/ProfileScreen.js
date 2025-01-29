import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Platform 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const MenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>
      <Icon name={icon} size={24} color={colors.primary} />
    </View>
    <Text style={styles.menuTitle}>{title}</Text>
    <Icon name="chevron-right" size={20} color={colors.primary} />
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const defaultAvatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk4YFqN1SAjcUyyZHKPnYZT7OKASIze5iHOg&s";

  const menuItems = [
    {
      id: 'edit_profile',
      icon: 'user',
      title: 'Edit Profile',
      screen: 'EditProfile'
    },
    {
      id: 'orders',
      icon: 'shopping-bag',
      title: 'My Orders',
      screen: 'OrderHistory'
    },
    {
      id: 'notifications',
      icon: 'bell',
      title: 'Notifications',
      screen: 'Notifications'
    },
    {
      id: 'customer_care',
      icon: 'headphones',
      title: 'Customer Care',
      screen: 'CustomerCare'
    },
    {
      id: 'privacy',
      icon: 'lock',
      title: 'Privacy Policy',
      screen: 'PrivacyPolicy'
    },
    {
      id: 'terms',
      icon: 'file-text',
      title: 'Terms & Conditions',
      screen: 'Terms'
    },
    {
      id: 'shipping',
      icon: 'truck',
      title: 'Shipping Policy',
      screen: 'ShippingPolicy'
    },
    {
      id: 'returns',
      icon: 'refresh-ccw',
      title: 'Returns & Refunds',
      screen: 'Returns'
    },
    {
      id: 'settings',
      icon: 'settings',
      title: 'Settings',
      screen: 'Settings',
    }
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <Image
            source={{ uri: defaultAvatarUrl }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Chinmay</Text>
          <Text style={styles.email}>chinmaydjain@gmail.com</Text>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map(item => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              onPress={() => navigation.navigate(item.screen, item.params)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontFamily: fonts.secondary.bold,
    fontSize: 28,
    color: colors.primary,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontFamily: fonts.secondary.bold,
    fontSize: 24,
    color: colors.primary,
    marginBottom: 4,
  },
  email: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: colors.primary,
    opacity: 0.7,
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    width: 40,
    alignItems: 'center',
  },
  menuTitle: {
    flex: 1,
    marginLeft: 16,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    color: colors.primary,
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: fonts.primary.bold,
    fontSize: 16,
    color: colors.secondary,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
});

export default ProfileScreen; 