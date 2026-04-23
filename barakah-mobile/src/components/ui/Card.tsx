import React from 'react';
import { View, ViewProps } from 'react-native';
import { useFluxColors, FluxSpacing, FluxRadius, FluxShadow } from '@flux-ds/react-native-ds';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated';
}

export function Card({ variant = 'default', className, style, children, ...props }: CardProps) {
  const colors = useFluxColors();

  return (
    <View
      className={`bg-nb-card rounded-2xl p-4 ${className ?? ''}`}
      style={[
        {
          backgroundColor: colors.secondary,
          borderRadius: FluxRadius.lg,
          padding: FluxSpacing.md,
        },
        variant === 'elevated' ? FluxShadow.medium : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
