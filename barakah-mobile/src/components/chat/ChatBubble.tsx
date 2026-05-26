import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { colors as themeColors } from '../../theme/colors';
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
          isUser ? 'bg-nb-green rounded-br-sm' : 'rounded-bl-sm'
        }`}
        style={
          !isUser
            ? {
                backgroundColor: themeColors.glass.bg,
                borderWidth: 1,
                borderColor: themeColors.glass.border,
              }
            : undefined
        }
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
              activeOpacity={0.7}
              style={{
                backgroundColor: themeColors.glass.bgSubtle,
                borderWidth: 1,
                borderColor: 'rgba(0, 212, 170, 0.25)',
                borderRadius: 9999,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
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
