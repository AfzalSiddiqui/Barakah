import React from 'react';
import { View, ViewProps, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useFluxColors, FluxSpacing, FluxRadius, FluxShadow } from '@flux-ds/react-native-ds';
import { colors as themeColors } from '../../theme/colors';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'glass';
  glassIntensity?: number;
}

export function Card({ variant = 'glass', className, style, children, glassIntensity = 25, ...props }: CardProps) {
  const colors = useFluxColors();

  if (variant === 'glass' || variant === 'default' || variant === 'elevated') {
    return (
      <View
        className={`rounded-2xl overflow-hidden ${className ?? ''}`}
        style={[
          {
            borderRadius: FluxRadius.lg,
            borderWidth: 1,
            borderColor: themeColors.glass.border,
          },
          variant === 'elevated' ? FluxShadow.medium : undefined,
          style,
        ]}
        {...props}
      >
        <BlurView
          intensity={glassIntensity}
          tint="dark"
          style={{
            padding: FluxSpacing.md,
            backgroundColor: Platform.OS === 'android' ? themeColors.glass.bg : undefined,
          }}
        >
          {children}
        </BlurView>
      </View>
    );
  }

  return (
    <View
      className={`rounded-2xl p-4 ${className ?? ''}`}
      style={[
        {
          backgroundColor: colors.secondary,
          borderRadius: FluxRadius.lg,
          padding: FluxSpacing.md,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
