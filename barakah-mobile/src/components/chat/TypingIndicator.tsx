import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  type SharedValue,
} from 'react-native-reanimated';

export function TypingIndicator() {
  const colors = useFluxColors();
  const dot1 = useSharedValue(0.3);
  const dot2 = useSharedValue(0.3);
  const dot3 = useSharedValue(0.3);

  useEffect(() => {
    const animate = (sv: SharedValue<number>, delay: number) => {
      sv.value = withRepeat(
        withDelay(
          delay,
          withSequence(
            withTiming(1, { duration: 400 }),
            withTiming(0.3, { duration: 400 })
          )
        ),
        -1
      );
    };
    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, []);

  const style1 = useAnimatedStyle(() => ({ opacity: dot1.value }));
  const style2 = useAnimatedStyle(() => ({ opacity: dot2.value }));
  const style3 = useAnimatedStyle(() => ({ opacity: dot3.value }));

  const dotStyle = { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success };

  return (
    <View className="flex-row items-center bg-nb-card rounded-2xl rounded-bl-sm px-4 py-3 self-start mb-3">
      <Animated.View style={[style1, dotStyle, { marginRight: 6 }]} />
      <Animated.View style={[style2, dotStyle, { marginRight: 6 }]} />
      <Animated.View style={[style3, dotStyle]} />
    </View>
  );
}
