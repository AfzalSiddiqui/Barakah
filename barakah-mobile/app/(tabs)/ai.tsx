import React, { useRef, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../src/components/ui/Typography';
import { ChatBubble } from '../../src/components/chat/ChatBubble';
import { ChatInput } from '../../src/components/chat/ChatInput';
import { TypingIndicator } from '../../src/components/chat/TypingIndicator';
import { useChatStore } from '../../src/store/chatStore';

export default function AIScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { messages, isTyping, sendMessage } = useChatStore();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  const handleActionPress = (payload?: string) => {
    if (payload) {
      router.push(`/(tabs)/${payload}` as any);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-nb-dark" edges={['top']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View className="px-5 py-3 border-b border-nb-card">
          <View className="flex-row items-center">
            <View className="w-9 h-9 rounded-full bg-nb-green/20 items-center justify-center mr-2.5">
              <Typography variant="bodyBold" className="text-nb-green">
                M
              </Typography>
            </View>
            <View>
              <Typography variant="bodyBold" className="text-nb-text">
                {t('ai.title')}
              </Typography>
              <Typography variant="small" className="text-nb-green">
                {t('ai.subtitle')}
              </Typography>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              onActionPress={handleActionPress}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <View className="h-4" />
        </ScrollView>

        {/* Input */}
        <ChatInput
          onSend={sendMessage}
          disabled={isTyping}
          placeholder={t('ai.placeholder')}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
