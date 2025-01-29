import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Platform 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { useCart } from '../context/CartContext';

const CheckoutScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { items, getCartTotal } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('card');

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: 'credit-card' },
    { id: 'upi', label: 'UPI', icon: 'smartphone' },
    { id: 'cod', label: 'Cash on Delivery', icon: 'dollar-sign' },
  ];

  const handlePlaceOrder = () => {
    // Handle order placement
    navigation.navigate('OrderConfirmation');
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
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressName}>Chinmay</Text>
            <Text style={styles.addressText}>123 Main Street</Text>
            <Text style={styles.addressText}>Mumbai, 400001</Text>
            <Text style={styles.addressText}>+91 9876543210</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentOption,
                selectedPayment === method.id && styles.paymentOptionSelected
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <Icon name={method.icon} size={24} color={colors.primary} />
              <Text style={styles.paymentLabel}>{method.label}</Text>
              {selectedPayment === method.id && (
                <Icon name="check" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {items.map(item => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.orderItemName}>{item.name}</Text>
              <Text style={styles.orderItemPrice}>
                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>${getCartTotal()}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
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
  scrollContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.secondary.bold,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 16,
  },
  addressCard: {
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addressName: {
    fontFamily: fonts.primary.bold,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 8,
  },
  addressText: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.primary,
    marginBottom: 4,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 8,
  },
  paymentOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  paymentLabel: {
    flex: 1,
    marginLeft: 16,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    color: colors.primary,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderItemName: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: colors.primary,
  },
  orderItemPrice: {
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    color: colors.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    fontFamily: fonts.secondary.bold,
    fontSize: 18,
    color: colors.primary,
  },
  totalAmount: {
    fontFamily: fonts.secondary.bold,
    fontSize: 24,
    color: colors.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  placeOrderButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: {
    fontFamily: fonts.primary.bold,
    fontSize: 16,
    color: colors.secondary,
  },
});

export default CheckoutScreen; 