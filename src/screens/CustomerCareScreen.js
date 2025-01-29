import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const CustomerCareScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const supportOptions = [
    {
      id: 'chat',
      title: 'Chat with Us',
      description: 'Start a conversation with our support team',
      icon: 'message-circle',
      onPress: () => navigation.navigate('Main', { screen: 'Home' }),
    },
    {
      id: 'call',
      title: 'Call Us',
      description: '+1 (555) 123-4567',
      icon: 'phone',
      onPress: () => navigation.navigate('Main', { screen: 'Home' }),
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'support@marbelo.com',
      icon: 'mail',
      onPress: () => navigation.navigate('Main', { screen: 'Home' }),
    },
    {
      id: 'faq',
      title: 'FAQs',
      description: 'Find answers to common questions',
      icon: 'help-circle',
      onPress: () => navigation.navigate('Main', { screen: 'Home' }),
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
        <Text style={styles.headerTitle}>Customer Care</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {supportOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionCard}
            onPress={option.onPress}
          >
            <Icon name={option.icon} size={24} color={colors.primary} />
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.primary} />
          </TouchableOpacity>
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
  // ... add more styles
});

export default CustomerCareScreen; 