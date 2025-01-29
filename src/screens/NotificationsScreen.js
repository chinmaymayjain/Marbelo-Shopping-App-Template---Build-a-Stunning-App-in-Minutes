import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const notifications = [
  {
    id: '1',
    title: 'Order Delivered',
    message: 'Your order #ORD123456 has been delivered successfully',
    time: '2 hours ago',
    type: 'success',
    read: false,
  },
  {
    id: '2',
    title: 'New Collection Available',
    message: 'Check out our latest summer collection',
    time: '1 day ago',
    type: 'info',
    read: true,
  },
  {
    id: '3',
    title: 'Special Offer',
    message: 'Get 20% off on all denim jackets',
    time: '2 days ago',
    type: 'promo',
    read: false,
  },
];

const NotificationItem = ({ item }) => (
  <TouchableOpacity 
    style={[
      styles.notificationItem,
      !item.read && styles.unreadItem
    ]}
  >
    <View style={styles.iconContainer}>
      <Icon 
        name={
          item.type === 'success' ? 'check-circle' : 
          item.type === 'info' ? 'info' : 'tag'
        } 
        size={24} 
        color={
          item.type === 'success' ? colors.success :
          item.type === 'info' ? colors.primary :
          colors.error
        }
      />
    </View>
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  </TouchableOpacity>
);

const NotificationsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationItem item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Icon name="bell-off" size={48} color={colors.primary} />
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      )}
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
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontFamily: fonts.secondary.bold,
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
    marginRight: 40,
  },
  list: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  unreadItem: {
    backgroundColor: colors.border + '30',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: fonts.secondary.bold,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 4,
  },
  notificationMessage: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.primary,
    opacity: 0.7,
    marginBottom: 8,
  },
  notificationTime: {
    fontFamily: fonts.primary.medium,
    fontSize: 12,
    color: colors.primary,
    opacity: 0.5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontFamily: fonts.secondary.medium,
    fontSize: 18,
    color: colors.primary,
    marginTop: 16,
  },
});

export default NotificationsScreen; 