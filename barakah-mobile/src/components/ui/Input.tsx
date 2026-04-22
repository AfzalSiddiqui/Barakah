import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { Typography } from './Typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <View className={className}>
      {label && (
        <Typography variant="captionBold" className="text-nb-muted mb-2">
          {label}
        </Typography>
      )}
      <TextInput
        className={`bg-nb-surface text-nb-text text-[13px] px-3 py-2.5 rounded-xl border ${
          error ? 'border-nb-red' : 'border-nb-card'
        }`}
        placeholderTextColor="#6B7B8D"
        {...props}
      />
      {error && (
        <Typography variant="small" className="text-nb-red mt-1">
          {error}
        </Typography>
      )}
    </View>
  );
}
