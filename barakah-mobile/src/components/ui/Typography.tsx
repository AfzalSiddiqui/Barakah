import React from 'react';
import { Text, TextProps } from 'react-native';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'caption' | 'captionBold' | 'small' | 'smallBold';

interface TypographyProps extends TextProps {
  variant?: Variant;
  color?: string;
}

const variantClasses: Record<Variant, string> = {
  h1: 'text-[26px] font-bold leading-8',
  h2: 'text-[20px] font-bold leading-7',
  h3: 'text-[17px] font-semibold leading-6',
  body: 'text-[14px] font-normal leading-5',
  bodyBold: 'text-[14px] font-semibold leading-5',
  caption: 'text-[12px] font-normal leading-4',
  captionBold: 'text-[12px] font-semibold leading-4',
  small: 'text-[10px] font-normal leading-3',
  smallBold: 'text-[10px] font-semibold leading-3',
};

export function Typography({
  variant = 'body',
  className,
  children,
  ...props
}: TypographyProps) {
  return (
    <Text
      className={`text-nb-text ${variantClasses[variant]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </Text>
  );
}
