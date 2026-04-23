import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';

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
    <View className="flex-row items-end bg-nb-surface border-t border-nb-card px-4 py-3">
      <TextInput
        className="flex-1 bg-nb-card text-nb-text text-[13px] rounded-2xl px-4 py-2.5 mr-3 max-h-[100px]"
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
          canSend ? 'bg-nb-green' : 'bg-nb-card'
        }`}
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
