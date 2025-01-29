import { Animated, Easing } from 'react-native';

export const slideDown = (animValue) => {
  animValue.setValue(0);
  return Animated.timing(animValue, {
    toValue: 1,
    duration: 300,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    useNativeDriver: true,
  });
};

export const fadeIn = (animValue) => {
  animValue.setValue(0);
  return Animated.timing(animValue, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  });
};

export const scaleIn = (animValue) => {
  animValue.setValue(0.95);
  return Animated.spring(animValue, {
    toValue: 1,
    friction: 8,
    tension: 40,
    useNativeDriver: true,
  });
}; 