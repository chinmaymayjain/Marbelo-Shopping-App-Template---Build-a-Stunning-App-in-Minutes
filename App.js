import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './src/context/CartContext';
import SplashScreen from './src/screens/SplashScreen';
import AppNavigator from './src/navigation/AppNavigator';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CategoryProductsScreen from './src/screens/CategoryProductsScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import Toast from './src/components/Toast';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import CustomerCareScreen from './src/screens/CustomerCareScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import TermsScreen from './src/screens/TermsScreen';
import ShippingPolicyScreen from './src/screens/ShippingPolicyScreen';
import ReturnsScreen from './src/screens/ReturnsScreen';
import { WishlistProvider } from './src/context/WishlistContext';
import WishlistScreen from './src/screens/WishlistScreen';
import { ToastProvider } from './src/hooks/useToast';
import SettingsScreen from './src/screens/SettingsScreen';
import LanguageScreen from './src/screens/LanguageScreen';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

const fadeTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 300 },
    },
    close: {
      animation: 'timing',
      config: { duration: 300 },
    },
  },
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
};

const slideTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 300 },
    },
    close: {
      animation: 'timing',
      config: { duration: 300 },
    },
  },
  cardStyleInterpolator: ({ current, layouts, closing }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

const App = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    global.showToast = showToast;
    return () => {
      global.showToast = undefined;
    };
  }, [showToast]);

  const screenOptions = {
    headerShown: false,
    cardStyleInterpolator: ({ current, layouts, closing }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
      };
    },
    gestureEnabled: true,
    gestureDirection: 'horizontal',
  };

  // Add error boundary for navigation
  const linking = {
    fallback: {
      screens: {
        Main: {
          screens: {
            Home: ''
          }
        }
      }
    }
  };

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <NavigationContainer
                  linking={linking}
                >
                  {toast && (
                    <Toast
                      message={toast.message}
                      type={toast.type}
                      onHide={() => setToast(null)}
                    />
                  )}
                  <Stack.Navigator 
                    screenOptions={screenOptions}
                  >
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Main" component={AppNavigator} />
                    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                    <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                    <Stack.Screen name="Checkout" component={CheckoutScreen} />
                    <Stack.Screen name="Wishlist" component={WishlistScreen} />
                    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
                    <Stack.Screen name="CustomerCare" component={CustomerCareScreen} />
                    <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
                    <Stack.Screen name="Notifications" component={NotificationsScreen} />
                    <Stack.Screen name="Terms" component={TermsScreen} />
                    <Stack.Screen name="ShippingPolicy" component={ShippingPolicyScreen} />
                    <Stack.Screen name="Returns" component={ReturnsScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="Language" component={LanguageScreen} />
                  </Stack.Navigator>
                </NavigationContainer>
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
