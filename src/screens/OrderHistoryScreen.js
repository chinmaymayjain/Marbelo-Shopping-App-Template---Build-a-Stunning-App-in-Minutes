import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Platform 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const sampleOrders = [
  {
    id: '1',
    orderNumber: 'ORD123456',
    date: '2024-03-15',
    status: 'Delivered',
    total: '599.98',
    items: [
      {
        id: '101',
        name: 'Premium Denim Jacket',
        price: '299.99',
        quantity: 2,
        image: require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752e274.jpg'),
      },
    ],
  },
  // Add more orders as needed
];

const OrderItem = ({ order, onPress }) => (
  <TouchableOpacity style={styles.orderCard} onPress={onPress}>
    <View style={styles.orderHeader}>
      <View>
        <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
        <Text style={styles.orderDate}>{new Date(order.date).toLocaleDateString()}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: order.status === 'Delivered' ? colors.success : colors.primary }]}>
        <Text style={styles.statusText}>{order.status}</Text>
      </View>
    </View>
    
    <View style={styles.orderItems}>
      {order.items.map(item => (
        <View key={item.id} style={styles.itemRow}>
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemMeta}>Qty: {item.quantity}</Text>
          </View>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      ))}
    </View>

    <View style={styles.orderFooter}>
      <Text style={styles.totalLabel}>Total</Text>
      <Text style={styles.totalAmount}>${order.total}</Text>
    </View>
  </TouchableOpacity>
);

const OrderHistoryScreen = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <FlatList
        data={sampleOrders}
        renderItem={({ item }) => (
          <OrderItem 
            order={item}
            onPress={() => navigation.navigate('OrderDetails', { order: item })}
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
    fontFamily: fonts.secondary.bold,
    fontSize: 20,
    color: colors.primary,
  },
  list: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  orderCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  orderNumber: {
    fontFamily: fonts.secondary.bold,
    fontSize: 16,
    color: colors.primary,
  },
  orderDate: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.primary,
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: fonts.primary.medium,
    fontSize: 12,
    color: colors.secondary,
  },
  orderItems: {
    padding: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    color: colors.primary,
  },
  itemMeta: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: colors.primary,
    opacity: 0.7,
  },
  itemPrice: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    color: colors.primary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  totalLabel: {
    fontFamily: fonts.secondary.bold,
    fontSize: 16,
    color: colors.primary,
  },
  totalAmount: {
    fontFamily: fonts.secondary.bold,
    fontSize: 18,
    color: colors.primary,
  },
});

export default OrderHistoryScreen; 