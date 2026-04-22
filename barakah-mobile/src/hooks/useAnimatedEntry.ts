import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

interface AnimatedEntryOptions {
  delay?: number;
  duration?: number;
  translateY?: number;
}

export function useAnimatedEntry(options: AnimatedEntryOptions = {}) {
  const { delay = 0, duration = 500, translateY = 20 } = options;
  const opacity = useSharedValue(0);
  const translate = useSharedValue(translateY);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration }));
    translate.value = withDelay(delay, withTiming(0, { duration }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translate.value }],
  }));

  return animatedStyle;
}
