import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Platform,
  Alert 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

const SettingsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDark, toggleTheme } = useTheme();
  const { signOut, user } = useAuth();
  const showToast = useToast();
  const [notifications, setNotifications] = useState(true);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const success = await signOut();
            if (success) {
              showToast('Signed out successfully');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }
          },
        },
      ],
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Add account deletion logic
            showToast('Account deleted successfully');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
    );
  };

  const settingsSections = [
    {
      title: 'App Settings',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          type: 'switch',
          value: notifications,
          onValueChange: (value) => {
            setNotifications(value);
            showToast(value ? 'Notifications enabled' : 'Notifications disabled');
          },
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          type: 'switch',
          value: isDark,
          onValueChange: toggleTheme,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Edit Profile',
          type: 'link',
          value: user?.name,
          onPress: () => navigation.navigate('EditProfile'),
        },
        {
          id: 'language',
          title: 'Language',
          type: 'link',
          value: 'English',
          onPress: () => navigation.navigate('Language'),
        },
        {
          id: 'country',
          title: 'Country',
          type: 'link',
          value: 'United States',
          onPress: () => navigation.navigate('Country'),
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          id: 'changePassword',
          title: 'Change Password',
          type: 'link',
          onPress: () => navigation.navigate('ChangePassword'),
        },
        {
          id: 'twoFactor',
          title: 'Two-Factor Authentication',
          type: 'switch',
          value: false,
          onValueChange: (value) => {
            if (value) {
              navigation.navigate('TwoFactorSetup');
            } else {
              // Disable 2FA
              showToast('Two-factor authentication disabled');
            }
          },
        },
        {
          id: 'privacy',
          title: 'Privacy Settings',
          type: 'link',
          onPress: () => navigation.navigate('PrivacySettings'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          type: 'link',
          onPress: () => navigation.navigate('HelpCenter'),
        },
        {
          id: 'about',
          title: 'About App',
          type: 'link',
          onPress: () => navigation.navigate('About'),
          value: 'Version 1.0.0',
        },
      ],
    },
  ];

  const renderSettingItem = (item) => {
    if (item.type === 'switch') {
      return (
        <View style={styles.settingItem} key={item.id}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.secondary}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity 
        style={styles.settingItem} 
        key={item.id}
        onPress={item.onPress}
      >
        <Text style={styles.settingTitle}>{item.title}</Text>
        <View style={styles.settingValue}>
          {item.value && (
            <Text style={styles.settingValueText}>{item.value}</Text>
          )}
          <Icon name="chevron-right" size={20} color={colors.primary} />
        </View>
      </TouchableOpacity>
    );
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
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {settingsSections.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteButtonText}>Delete Account</Text>
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
  content: {
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
  sectionContent: {
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingTitle: {
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    color: colors.primary,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.primary,
    opacity: 0.7,
    marginRight: 8,
  },
  deleteButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.error,
    alignItems: 'center',
    marginTop: 24,
  },
  deleteButtonText: {
    fontFamily: fonts.primary.bold,
    fontSize: 16,
    color: colors.secondary,
  },
});

export default SettingsScreen; 