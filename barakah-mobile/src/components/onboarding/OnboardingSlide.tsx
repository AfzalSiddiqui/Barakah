import React from 'react';
import { View, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Typography } from '../ui/Typography';

const { width } = Dimensions.get('window');

interface OnboardingSlideProps {
  icon: string;
  title: string;
  subtitle: string;
  accentColor: string;
}

export function OnboardingSlide({ icon, title, subtitle, accentColor }: OnboardingSlideProps) {
  return (
    <View style={{ width }} className="flex-1 items-center justify-center px-8">
      <Animated.View
        entering={FadeInUp.duration(600)}
        className="w-32 h-32 rounded-full items-center justify-center mb-8"
        style={{ backgroundColor: `${accentColor}20` }}
      >
        <Typography variant="h1" className="text-[56px]">
          {icon}
        </Typography>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(200).duration(600)}>
        <Typography variant="h2" className="text-nb-text text-center mb-4">
          {title}
        </Typography>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(400).duration(600)}>
        <Typography variant="body" className="text-nb-muted text-center leading-6">
          {subtitle}
        </Typography>
      </Animated.View>
    </View>
  );
}
