import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { useFluxColors, FluxSpacing, FluxRadius, FluxOpacity } from '@anthropic-flux/react-native-ds';
import { FluxText } from '@anthropic-flux/react-native-foundation';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 rounded-lg',
  md: 'px-6 py-3 rounded-xl',
  lg: 'px-8 py-4 rounded-2xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  label,
  loading,
  icon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const colors = useFluxColors();

  const variantBgClasses: Record<ButtonVariant, string> = {
    primary: 'bg-nb-green',
    secondary: 'bg-nb-card',
    outline: 'border border-nb-green bg-transparent',
    ghost: 'bg-transparent',
  };

  const variantTextColor: Record<ButtonVariant, string> = {
    primary: colors.onPrimary,
    secondary: colors.textPrimary,
    outline: colors.primary,
    ghost: colors.primary,
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center ${variantBgClasses[variant]} ${sizeClasses[size]} ${
        disabled ? `opacity-${Math.round(FluxOpacity.disabled * 100)}` : ''
      } ${className ?? ''}`}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.onPrimary : colors.primary}
          size="small"
        />
      ) : (
        <>
          {icon}
          <FluxText
            textStyle={size === 'sm' ? 'caption' : 'footnote'}
            color={variantTextColor[variant]}
            style={icon ? { marginLeft: FluxSpacing.xs } : undefined}
          >
            {label}
          </FluxText>
        </>
      )}
    </TouchableOpacity>
  );
}
