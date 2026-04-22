import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ViewProps } from 'react-native';

interface GradientBackgroundProps extends ViewProps {
  colors?: readonly [string, string, ...string[]];
}

export function GradientBackground({
  colors = ['#0A0E17', '#141922'],
  className,
  children,
  ...props
}: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={colors}
      className={`flex-1 ${className ?? ''}`}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}
