import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { colors as themeColors } from '../../theme/colors';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = 'Ask about your finances...' }: ChatInputProps) {
  const colors = useFluxColors();
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  const canSend = text.trim() && !disabled;

  return (
    <View
      className="flex-row items-end px-4 py-3"
      style={{
        backgroundColor: themeColors.glass.bgSubtle,
        borderTopWidth: 1,
        borderTopColor: themeColors.glass.border,
      }}
    >
      <TextInput
        className="flex-1 text-nb-text text-[13px] rounded-2xl px-4 py-2.5 mr-3 max-h-[100px]"
        style={{
          backgroundColor: themeColors.glass.bg,
          borderWidth: 1,
          borderColor: themeColors.glass.border,
          color: colors.textPrimary,
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={text}
        onChangeText={setText}
        multiline
        editable={!disabled}
        onSubmitEditing={handleSend}
        returnKeyType="send"
      />
      <TouchableOpacity
        onPress={handleSend}
        disabled={!canSend}
        className={`w-11 h-11 rounded-full items-center justify-center ${
          canSend ? 'bg-nb-green' : ''
        }`}
        style={
          !canSend
            ? {
                backgroundColor: themeColors.glass.bg,
                borderWidth: 1,
                borderColor: themeColors.glass.border,
              }
            : undefined
        }
        activeOpacity={0.7}
      >
        <FluxText
          textStyle="body"
          color={canSend ? colors.onPrimary : colors.textSecondary}
          style={{ fontWeight: '600' }}
        >
          ↑
        </FluxText>
      </TouchableOpacity>
    </View>
  );
}
