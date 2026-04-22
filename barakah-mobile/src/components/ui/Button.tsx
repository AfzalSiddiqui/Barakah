import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { Typography } from './Typography';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-nb-green',
  secondary: 'bg-nb-card',
  outline: 'border border-nb-green bg-transparent',
  ghost: 'bg-transparent',
};

const variantTextClasses: Record<ButtonVariant, string> = {
  primary: 'text-nb-dark',
  secondary: 'text-nb-text',
  outline: 'text-nb-green',
  ghost: 'text-nb-green',
};

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
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? 'opacity-50' : ''
      } ${className ?? ''}`}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#0A0E17' : '#00D4AA'}
          size="small"
        />
      ) : (
        <>
          {icon}
          <Typography
            variant={size === 'sm' ? 'captionBold' : 'bodyBold'}
            className={`${variantTextClasses[variant]} ${icon ? 'ml-2' : ''}`}
          >
            {label}
          </Typography>
        </>
      )}
    </TouchableOpacity>
  );
}
