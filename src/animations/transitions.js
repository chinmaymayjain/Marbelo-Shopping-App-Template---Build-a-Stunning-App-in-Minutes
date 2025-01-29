import { Animated, Easing } from 'react-native';

export const screenTransitions = {
  slideRight: {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 300,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        },
      },
      close: {
        animation: 'timing',
        config: {
          duration: 300,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        },
      },
    },
    cardStyleInterpolator: ({ current, layouts }) => ({
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
    }),
  },
}; 