import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, Animated } from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 240;

const CarouselBanner = ({ images }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (currentIndex.current < images.length - 1) {
        currentIndex.current += 1;
      } else {
        currentIndex.current = 0;
      }

      flatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }, 3000); // Changed to 3 seconds for smoother experience

    return () => clearInterval(autoScroll);
  }, [images.length]);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image
        source={item}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  const renderDots = () => {
    const position = Animated.divide(scrollX, width);

    return (
      <View style={styles.dotsContainer}>
        {images.map((_, index) => {
          const opacity = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const scale = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [1, 1.2, 1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    backgroundColor: colors.background,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    width: width - 32, // Account for margins
    height: BANNER_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    marginHorizontal: 4,
  },
});

export default CarouselBanner; 