import React from 'react';
import { View } from 'react-native';
import { Typography } from './Typography';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: 'bg-nb-green/20', text: 'text-nb-green' },
  warning: { bg: 'bg-nb-gold/20', text: 'text-nb-gold' },
  error: { bg: 'bg-nb-red/20', text: 'text-nb-red' },
  info: { bg: 'bg-nb-accent/20', text: 'text-nb-accent' },
  neutral: { bg: 'bg-nb-muted/20', text: 'text-nb-muted' },
};

export function Badge({ label, variant = 'neutral', className }: BadgeProps) {
  const { bg, text } = variantClasses[variant];
  return (
    <View className={`${bg} px-3 py-1 rounded-full self-start ${className ?? ''}`}>
      <Typography variant="smallBold" className={text}>
        {label}
      </Typography>
    </View>
  );
}
