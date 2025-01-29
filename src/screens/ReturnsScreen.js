import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const ReturnsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const returnSteps = [
    {
      title: 'Initiate Return',
      description: 'Go to My Orders and select the item you wish to return',
    },
    {
      title: 'Package Item',
      description: 'Pack the item in its original packaging with all tags attached',
    },
    {
      title: 'Ship Back',
      description: 'Use the provided return label to ship the item back to us',
    },
    {
      title: 'Refund Processing',
      description: 'Refund will be initiated once we receive and inspect the item',
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Returns & Refunds</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Return Policy</Text>
          <Text style={styles.text}>
            We accept returns within 30 days of purchase. Items must be unused, unwashed, and in original packaging with all tags attached.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Return Process</Text>
          {returnSteps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Non-Returnable Items</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Customized or personalized items</Text>
            <Text style={styles.listItem}>• Items marked as final sale</Text>
            <Text style={styles.listItem}>• Intimate apparel for hygiene reasons</Text>
            <Text style={styles.listItem}>• Items damaged due to customer misuse</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Refund Information</Text>
          <Text style={styles.text}>
            Refunds will be processed to the original payment method within 5-7 business days after we receive your return. Shipping costs are non-refundable.
          </Text>
        </View>

        <View style={styles.helpSection}>
          <Icon name="help-circle" size={24} color={colors.primary} />
          <Text style={styles.helpText}>Need help with your return?</Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => navigation.navigate('CustomerCare')}
          >
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: fonts.primary.bold,
    fontSize: 18,
    color: colors.primary,
    marginLeft: 12,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.primary.bold,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 8,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.primary,
    lineHeight: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: colors.secondary,
    fontFamily: fonts.primary.bold,
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: fonts.secondary.bold,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 4,
  },
  stepDescription: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.primary,
    opacity: 0.7,
    lineHeight: 20,
  },
  helpSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.border + '30',
    borderRadius: 12,
    marginBottom: 24,
  },
  helpText: {
    fontFamily: fonts.secondary.medium,
    fontSize: 16,
    color: colors.primary,
    marginTop: 12,
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    color: colors.secondary,
  },
  list: {
    marginBottom: 24,
  },
  listItem: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.primary,
    marginBottom: 8,
  },
});

export default ReturnsScreen; 