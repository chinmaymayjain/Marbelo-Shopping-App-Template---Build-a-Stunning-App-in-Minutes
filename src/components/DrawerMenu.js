import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  Platform 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const { width, height } = Dimensions.get('window');

const DrawerMenu = ({ isVisible, onClose, navigation }) => {
  const insets = useSafeAreaInsets();
  const translateX = React.useRef(new Animated.Value(-width)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    } else {
      Animated.spring(translateX, {
        toValue: -width,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    }
  }, [isVisible]);

  const menuItems = [
    { name: 'Home', icon: 'home' },
    { name: 'Categories', icon: 'grid' },
    { name: 'Search', icon: 'search' },
    { name: 'Cart', icon: 'shopping-bag' },
    { name: 'Profile', icon: 'user' },
  ];

  const handleNavigation = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  return (
    <>
      {isVisible && (
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={onClose}
        >
          <Animated.View 
            style={[
              styles.drawer, 
              { paddingTop: insets.top },
              { transform: [{ translateX }] }
            ]}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Menu</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="x" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.menuItems}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.name)}
                >
                  <Icon name={item.icon} size={24} color={colors.primary} />
                  <Text style={styles.menuText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: height,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: fonts.secondary.bold,
    fontSize: 24,
    color: colors.primary,
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    color: colors.primary,
    marginLeft: 15,
  },
});

export default DrawerMenu; 