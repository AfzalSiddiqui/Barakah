import React from 'react';
import { useFluxColors } from '@flux-ds/react-native-ds';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';

interface PaginationDotsProps {
  count: number;
  activeIndex: number;
}

function Dot({ active, activeColor }: { active: boolean; activeColor: string }) {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(active ? 24 : 8, { duration: 200 }),
    opacity: withTiming(active ? 1 : 0.4, { duration: 200 }),
  }));

  return (
    <Animated.View
      style={[animatedStyle, { height: 8, borderRadius: 4, backgroundColor: activeColor, marginHorizontal: 4 }]}
    />
  );
}

export function PaginationDots({ count, activeIndex }: PaginationDotsProps) {
  const colors = useFluxColors();

  return (
    <View className="flex-row items-center justify-center">
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} active={i === activeIndex} activeColor={colors.success} />
      ))}
    </View>
  );
}
