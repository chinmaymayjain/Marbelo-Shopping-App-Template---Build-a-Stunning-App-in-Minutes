import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/useToast';
import { ordersAPI } from '../services/api/orders';

const PlaceOrderScreen = ({ route, navigation }) => {
  const { shippingAddress, paymentMethod } = route.params;
  const insets = useSafeAreaInsets();
  const { items, getCartTotal, clearCart } = useCart();
  const showToast = useToast();
  const [loading, setLoading] = useState(false);

  const subtotal = getCartTotal();
  const shipping = parseFloat(subtotal) > 500 ? 0 : 50;
  const tax = (parseFloat(subtotal) * 0.18).toFixed(2);
  const total = (parseFloat(subtotal) + shipping + parseFloat(tax)).toFixed(2);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
        })),
        shippingAddress,
        paymentMethod,
        subtotal,
        shipping,
        tax,
        total,
      };

      const response = await ordersAPI.createOrder(orderData);
      clearCart();
      showToast('Order placed successfully!');
      navigation.reset({
        index: 1,
        routes: [
          { name: 'Main' },
          { name: 'OrderConfirmation', params: { orderId: response.data.orderId } },
        ],
      });
    } catch (error) {
      showToast('Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.headerTitle}>Order Summary</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Shipping Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressName}>{shippingAddress.name}</Text>
            <Text style={styles.addressText}>{shippingAddress.street}</Text>
            <Text style={styles.addressText}>
              {shippingAddress.city}, {shippingAddress.zipCode}
            </Text>
            <Text style={styles.addressText}>{shippingAddress.phone}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentCard}>
            <Icon 
              name={paymentMethod.type === 'card' ? 'credit-card' : 'dollar-sign'} 
              size={24} 
              color={colors.primary} 
            />
            <Text style={styles.paymentText}>
              {paymentMethod.type === 'card' 
                ? `Card ending in ${paymentMethod.last4}` 
                : 'Cash on Delivery'}
            </Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {items.map(item => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>
                Size: {item.size} | Qty: {item.quantity}
              </Text>
              <Text style={styles.itemPrice}>
                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Order Total */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Total</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${subtotal}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping</Text>
            <Text style={styles.totalValue}>${shipping.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (18%)</Text>
            <Text style={styles.totalValue}>${tax}</Text>
          </View>
          <View style={[styles.totalRow, styles.finalTotal]}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>${total}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.placeOrderButton, loading && styles.buttonDisabled]}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.secondary} />
          ) : (
            <Text style={styles.placeOrderText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... add styles
});

export default PlaceOrderScreen; 