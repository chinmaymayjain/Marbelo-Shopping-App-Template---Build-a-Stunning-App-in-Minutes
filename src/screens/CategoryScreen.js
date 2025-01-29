import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { slideDown } from '../animations';

const CategoryScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    slideDown(animatedValue).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0],
            }),
          },
        ],
        opacity: animatedValue,
      }}
    >
      {/* Category content */}
    </Animated.View>
  );
};

export default CategoryScreen; 