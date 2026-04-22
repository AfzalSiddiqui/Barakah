import React, { useRef, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingSlide } from '../src/components/onboarding/OnboardingSlide';
import { PaginationDots } from '../src/components/onboarding/PaginationDots';
import { Button } from '../src/components/ui/Button';
import { Typography } from '../src/components/ui/Typography';
import { useAppStore } from '../src/store/appStore';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    icon: '🤖',
    title: 'AI-Powered Banking',
    subtitle: 'Conversational finance that understands your needs. Ask anything, get instant answers.',
    accentColor: '#4F8CFF',
  },
  {
    icon: '🕌',
    title: 'Islamic Finance First',
    subtitle: 'AAOIFI-compliant products with built-in Sharia governance. Every transaction is auditable.',
    accentColor: '#00D4AA',
  },
  {
    icon: '🔒',
    title: 'Your Privacy, Our Priority',
    subtitle: 'Bank-grade encryption with local-first processing. Your data never leaves your device.',
    accentColor: '#D4A843',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const setOnboarded = useAppStore((s) => s.setOnboarded);
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(idx);
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: (activeIndex + 1) * width, animated: true });
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = () => {
    setOnboarded(true);
    router.replace('/(tabs)/dashboard');
  };

  return (
    <View className="flex-1 bg-nb-dark">
      <View className="absolute top-16 right-6 z-10">
        {activeIndex < slides.length - 1 && (
          <Button
            variant="ghost"
            size="sm"
            label="Skip"
            onPress={handleGetStarted}
          />
        )}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        className="flex-1"
      >
        {slides.map((slide, idx) => (
          <OnboardingSlide key={idx} {...slide} />
        ))}
      </ScrollView>

      <View className="px-8 pb-12">
        <PaginationDots count={slides.length} activeIndex={activeIndex} />
        <View className="mt-8">
          <Button
            variant="primary"
            size="lg"
            label={activeIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
          />
        </View>
        <View className="mt-4 items-center">
          <Typography variant="small" className="text-nb-muted">
            By continuing, you agree to our Terms & Sharia Governance Policy
          </Typography>
        </View>
      </View>
    </View>
  );
}
