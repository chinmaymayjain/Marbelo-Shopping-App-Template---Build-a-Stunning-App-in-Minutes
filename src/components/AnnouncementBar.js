import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const announcements = [
  'SUMMER SALE - UP TO 50% OFF',
  'FREE SHIPPING ON ORDERS ABOVE ₹25,000',
  'USE CODE FIRST20 FOR EXTRA 20% OFF',
];

const { width } = Dimensions.get('window');

const AnnouncementBar = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  
  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % announcements.length;
      flatListRef.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={announcements}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  slide: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.secondary,
    fontFamily: fonts.primary.medium,
    fontSize: 12,
    letterSpacing: 1,
  },
});

export default AnnouncementBar; 