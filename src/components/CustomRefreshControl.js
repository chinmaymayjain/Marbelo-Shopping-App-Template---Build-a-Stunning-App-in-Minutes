import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

const CustomRefreshControl = ({ refreshing, onRefresh, scrollY }) => {
  const spinValue = new Animated.Value(0);

  React.useEffect(() => {
    if (refreshing) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [refreshing]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const translateY = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [20, -20],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }, { rotate: spin }],
        },
      ]}
    >
      <View style={styles.spinner} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  spinner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    borderTopColor: 'transparent',
  },
});

export default CustomRefreshControl; 