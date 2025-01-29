import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const ShippingPolicyScreen = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>Shipping Policy</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Methods</Text>
          <Text style={styles.text}>
            We offer various shipping methods to meet your needs:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Standard Shipping (5-7 business days)</Text>
            <Text style={styles.listItem}>• Express Shipping (2-3 business days)</Text>
            <Text style={styles.listItem}>• Next Day Delivery (order before 2 PM)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Costs</Text>
          <Text style={styles.text}>
            Free shipping on orders above $500. Standard shipping rates apply for orders below this amount.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Areas</Text>
          <Text style={styles.text}>
            We currently ship to all major cities and surrounding areas. Remote locations may require additional delivery time.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Tracking</Text>
          <Text style={styles.text}>
            Once your order is shipped, you will receive a tracking number via email to monitor your delivery status.
          </Text>
        </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontFamily: fonts.secondary.bold,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 12,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: colors.primary,
    lineHeight: 24,
    marginBottom: 12,
  },
  list: {
    marginTop: 8,
  },
  listItem: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: colors.primary,
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 8,
  },
});

export default ShippingPolicyScreen; 