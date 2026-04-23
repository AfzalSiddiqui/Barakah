import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { useFluxColors, FluxSpacing, FluxRadius, FluxBorder } from '@anthropic-flux/react-native-ds';
import { FluxText } from '@anthropic-flux/react-native-foundation';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, style, ...props }: InputProps) {
  const colors = useFluxColors();

  return (
    <View className={className}>
      {label && (
        <FluxText
          textStyle="caption"
          color={colors.textSecondary}
          style={{ marginBottom: FluxSpacing.xs, fontWeight: '600' }}
        >
          {label}
        </FluxText>
      )}
      <TextInput
        style={[
          {
            backgroundColor: colors.surface,
            color: colors.textPrimary,
            fontSize: 13,
            paddingHorizontal: FluxSpacing.sm,
            paddingVertical: 10,
            borderRadius: FluxRadius.md,
            borderWidth: FluxBorder.thin,
            borderColor: error ? colors.error : colors.border,
          },
          style,
        ]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
      {error && (
        <FluxText
          textStyle="caption"
          color={colors.error}
          style={{ marginTop: FluxSpacing.xxs }}
        >
          {error}
        </FluxText>
      )}
    </View>
  );
}
