import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useFluxColors, FluxTypography } from '@anthropic-flux/react-native-ds';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'caption' | 'captionBold' | 'small' | 'smallBold';

interface TypographyProps extends TextProps {
  variant?: Variant;
  color?: string;
}

const variantStyles: Record<Variant, TextStyle> = {
  h1: { fontSize: 26, fontWeight: '700', lineHeight: 32 },
  h2: { fontSize: 20, fontWeight: '700', lineHeight: 28 },
  h3: FluxTypography.headline,
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  bodyBold: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  caption: FluxTypography.caption,
  captionBold: { ...FluxTypography.caption, fontWeight: '600' },
  small: { fontSize: 10, fontWeight: '400', lineHeight: 14 },
  smallBold: { fontSize: 10, fontWeight: '600', lineHeight: 14 },
};

export function Typography({
  variant = 'body',
  color,
  className,
  style,
  children,
  ...props
}: TypographyProps) {
  const colors = useFluxColors();

  return (
    <Text
      className={`text-nb-text ${className ?? ''}`}
      style={[variantStyles[variant], color ? { color } : { color: colors.textPrimary }, style]}
      {...props}
    >
      {children}
    </Text>
  );
}
