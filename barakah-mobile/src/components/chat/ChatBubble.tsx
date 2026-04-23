import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import type { ChatMessage } from '../../engines/types';

interface ChatBubbleProps {
  message: ChatMessage;
  onActionPress?: (payload?: string) => void;
}

export function ChatBubble({ message, onActionPress }: ChatBubbleProps) {
  const colors = useFluxColors();
  const isUser = message.role === 'user';

  return (
    <View className={`mb-3 ${isUser ? 'items-end' : 'items-start'}`}>
      <View
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-nb-green rounded-br-sm' : 'bg-nb-card rounded-bl-sm'
        }`}
      >
        <FluxText
          textStyle="body"
          color={isUser ? colors.onPrimary : colors.textPrimary}
          style={{ fontSize: 14 }}
        >
          {message.content}
        </FluxText>
      </View>
      {message.actions && message.actions.length > 0 && (
        <View className="flex-row flex-wrap mt-2 gap-2">
          {message.actions.map((action) => (
            <TouchableOpacity
              key={action.id}
              onPress={() => onActionPress?.(action.payload)}
              className="bg-nb-surface border border-nb-green/30 rounded-full px-3 py-1.5"
              activeOpacity={0.7}
            >
              <FluxText textStyle="caption" color={colors.success} style={{ fontWeight: '600', fontSize: 10 }}>
                {action.label}
              </FluxText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
