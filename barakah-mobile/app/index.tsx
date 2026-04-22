import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { Typography } from '../src/components/ui/Typography';
import { useAppStore } from '../src/store/appStore';

export default function SplashScreen() {
  const router = useRouter();
  const isOnboarded = useAppStore((s) => s.isOnboarded);

  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  const navigate = () => {
    if (isOnboarded) {
      router.replace('/(tabs)/dashboard');
    } else {
      router.replace('/onboarding');
    }
  };

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 600 });
    logoScale.value = withSequence(
      withTiming(1.1, { duration: 400 }),
      withTiming(1, { duration: 200 })
    );
    taglineOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    containerOpacity.value = withDelay(2200, withTiming(0, { duration: 400 }, () => {
      runOnJS(navigate)();
    }));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  return (
    <Animated.View style={containerStyle} className="flex-1 bg-nb-dark items-center justify-center">
      <Animated.View style={logoStyle} className="items-center">
        <View className="w-24 h-24 rounded-3xl bg-nb-green/20 items-center justify-center mb-6">
          <Typography variant="h1" className="text-nb-green text-[40px]">
            B
          </Typography>
        </View>
        <Typography variant="h1" className="text-nb-text tracking-widest">
          Barakah
        </Typography>
      </Animated.View>

      <Animated.View style={taglineStyle} className="mt-4">
        <Typography variant="body" className="text-nb-green tracking-wider">
          Ask. Act. Done.
        </Typography>
      </Animated.View>

      <View className="absolute bottom-12">
        <Typography variant="small" className="text-nb-muted">
          Islamic Digital Banking
        </Typography>
      </View>
    </Animated.View>
  );
}
