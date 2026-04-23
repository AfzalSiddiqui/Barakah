import React from 'react';
import { View, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';

const { width } = Dimensions.get('window');

interface OnboardingSlideProps {
  icon: string;
  title: string;
  subtitle: string;
  accentColor: string;
}

export function OnboardingSlide({ icon, title, subtitle, accentColor }: OnboardingSlideProps) {
  const colors = useFluxColors();

  return (
    <View style={{ width }} className="flex-1 items-center justify-center px-8">
      <Animated.View
        entering={FadeInUp.duration(600)}
        className="w-32 h-32 rounded-full items-center justify-center mb-8"
        style={{ backgroundColor: `${accentColor}20` }}
      >
        <FluxText textStyle="largeTitle" style={{ fontSize: 56 }}>
          {icon}
        </FluxText>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(200).duration(600)}>
        <FluxText textStyle="title2" color={colors.textPrimary} style={{ textAlign: 'center', marginBottom: 16 }}>
          {title}
        </FluxText>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(400).duration(600)}>
        <FluxText textStyle="body" color={colors.textSecondary} style={{ textAlign: 'center', lineHeight: 24, fontSize: 14 }}>
          {subtitle}
        </FluxText>
      </Animated.View>
    </View>
  );
}
