import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { useFluxColors, FluxSpacing, FluxRadius, FluxOpacity } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { colors as themeColors } from '../../theme/colors';

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
  style,
  ...props
}: ButtonProps) {
  const colors = useFluxColors();

  const variantTextColor: Record<ButtonVariant, string> = {
    primary: colors.onPrimary,
    secondary: colors.textPrimary,
    outline: colors.primary,
    ghost: colors.primary,
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: '#00D4AA' };
      case 'secondary':
        return {
          backgroundColor: themeColors.glass.bg,
          borderWidth: 1,
          borderColor: themeColors.glass.border,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: 'rgba(0, 212, 170, 0.3)',
        };
      case 'ghost':
        return { backgroundColor: 'transparent' };
    }
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center ${sizeClasses[size]} ${
        disabled ? `opacity-${Math.round(FluxOpacity.disabled * 100)}` : ''
      } ${className ?? ''}`}
      style={[getVariantStyle(), style]}
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
