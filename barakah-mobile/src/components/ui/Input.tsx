import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { useFluxColors, FluxSpacing, FluxRadius, FluxBorder } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { colors as themeColors } from '../../theme/colors';

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
            backgroundColor: themeColors.glass.bg,
            color: colors.textPrimary,
            fontSize: 13,
            paddingHorizontal: FluxSpacing.sm,
            paddingVertical: 10,
            borderRadius: FluxRadius.md,
            borderWidth: 1,
            borderColor: error ? colors.error : themeColors.glass.border,
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
