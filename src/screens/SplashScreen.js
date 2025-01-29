import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const rippleScale = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.8)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Ripple animation - 1.5x slower
    Animated.sequence([
      Animated.timing(rippleScale, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      // Text fade in and scale
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.spring(textScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Hold for longer
      Animated.delay(1200),
      // Text grows and screen fades out
      Animated.parallel([
        Animated.timing(textScale, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      navigation.replace('Main');
    });
  }, []);

  const rippleSize = 2000; // Increased for fuller coverage
  const rippleTransform = {
    transform: [
      {
        scale: rippleScale.interpolate({
          inputRange: [0, 1],
          outputRange: [0, rippleSize / 50],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.ripple,
            rippleTransform,
          ]}
        />
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{ scale: textScale }],
            },
          ]}
        >
          <Text style={styles.mainText}>MARBELO</Text>
          <Text style={styles.subText}>by Chinmay Jain</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  ripple: {
    position: 'absolute',
    top: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000000',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontFamily: fonts.primary.bold,
    letterSpacing: 4,
  },
  subText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    marginTop: 8,
    letterSpacing: 2,
  },
});

export default SplashScreen; 