import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../ui/Typography';
import type { ChatMessage } from '../../engines/types';

interface ChatBubbleProps {
  message: ChatMessage;
  onActionPress?: (payload?: string) => void;
}

export function ChatBubble({ message, onActionPress }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View className={`mb-3 ${isUser ? 'items-end' : 'items-start'}`}>
      <View
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-nb-green rounded-br-sm' : 'bg-nb-card rounded-bl-sm'
        }`}
      >
        <Typography
          variant="body"
          className={isUser ? 'text-nb-dark' : 'text-nb-text'}
        >
          {message.content}
        </Typography>
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
              <Typography variant="smallBold" className="text-nb-green">
                {action.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
