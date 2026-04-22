import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface PaginationDotsProps {
  count: number;
  activeIndex: number;
}

function Dot({ active }: { active: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(active ? 24 : 8, { duration: 200 }),
    opacity: withTiming(active ? 1 : 0.4, { duration: 200 }),
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className="h-2 rounded-full bg-nb-green mx-1"
    />
  );
}

export function PaginationDots({ count, activeIndex }: PaginationDotsProps) {
  return (
    <View className="flex-row items-center justify-center">
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} active={i === activeIndex} />
      ))}
    </View>
  );
}
