import React from 'react';
import { View } from 'react-native';
import { useFluxColors, FluxSpacing, FluxRadius, hexToRgba } from '@anthropic-flux/react-native-ds';
import { FluxText } from '@anthropic-flux/react-native-foundation';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ label, variant = 'neutral', className }: BadgeProps) {
  const colors = useFluxColors();

  const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
    success: { bg: hexToRgba(colors.success, 0.2), text: colors.success },
    warning: { bg: hexToRgba(colors.warning, 0.2), text: colors.warning },
    error: { bg: hexToRgba(colors.error, 0.2), text: colors.error },
    info: { bg: hexToRgba(colors.accent, 0.2), text: colors.accent },
    neutral: { bg: hexToRgba(colors.textSecondary, 0.2), text: colors.textSecondary },
  };

  const { bg, text } = variantColors[variant];

  return (
    <View
      className={`self-start ${className ?? ''}`}
      style={{
        backgroundColor: bg,
        paddingHorizontal: FluxSpacing.sm,
        paddingVertical: FluxSpacing.xxs,
        borderRadius: FluxRadius.full,
      }}
    >
      <FluxText
        textStyle="caption"
        color={text}
        style={{ fontWeight: '600', fontSize: 10 }}
      >
        {label}
      </FluxText>
    </View>
  );
}
