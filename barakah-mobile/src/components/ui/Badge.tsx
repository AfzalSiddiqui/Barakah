import React from 'react';
import { View } from 'react-native';
import { useFluxColors, FluxSpacing, FluxRadius, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ label, variant = 'neutral', className }: BadgeProps) {
  const colors = useFluxColors();

  const variantColors: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
    success: { bg: hexToRgba(colors.success, 0.12), text: colors.success, border: hexToRgba(colors.success, 0.25) },
    warning: { bg: hexToRgba(colors.warning, 0.12), text: colors.warning, border: hexToRgba(colors.warning, 0.25) },
    error: { bg: hexToRgba(colors.error, 0.12), text: colors.error, border: hexToRgba(colors.error, 0.25) },
    info: { bg: hexToRgba(colors.accent, 0.12), text: colors.accent, border: hexToRgba(colors.accent, 0.25) },
    neutral: { bg: 'rgba(255, 255, 255, 0.06)', text: colors.textSecondary, border: 'rgba(255, 255, 255, 0.12)' },
  };

  const { bg, text, border } = variantColors[variant];

  return (
    <View
      className={`self-start ${className ?? ''}`}
      style={{
        backgroundColor: bg,
        paddingHorizontal: FluxSpacing.sm,
        paddingVertical: FluxSpacing.xxs,
        borderRadius: FluxRadius.full,
        borderWidth: 1,
        borderColor: border,
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
