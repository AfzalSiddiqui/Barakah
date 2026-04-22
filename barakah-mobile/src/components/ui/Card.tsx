import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated';
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  const base = 'bg-nb-card rounded-2xl p-4';
  const elevation = variant === 'elevated' ? 'shadow-lg shadow-black/20' : '';

  return (
    <View className={`${base} ${elevation} ${className ?? ''}`} {...props}>
      {children}
    </View>
  );
}
