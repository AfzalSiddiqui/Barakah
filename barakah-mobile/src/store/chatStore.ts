import { create } from 'zustand';
import type { ChatMessage } from '../engines/types';
import { processMessage } from '../lib/chatEngine';
import { generateId } from '../lib/formatters';

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Assalamu Alaikum! I\'m your AI financial assistant. How can I help you today?',
      timestamp: Date.now(),
      actions: [
        { id: 'q1', label: 'Check Balance', type: 'calculate' },
        { id: 'q2', label: 'Calculate Zakat', type: 'navigate', payload: 'zakat' },
        { id: 'q3', label: 'Halal Check', type: 'navigate', payload: 'zakat' },
      ],
    },
  ],
  isTyping: false,

  sendMessage: async (content) => {
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      isTyping: true,
    }));

    const response = await processMessage(content);

    set((state) => ({
      messages: [...state.messages, response],
      isTyping: false,
    }));
  },

  clearChat: () =>
    set({
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Assalamu Alaikum! I\'m your AI financial assistant. How can I help you today?',
          timestamp: Date.now(),
        },
      ],
    }),
}));
