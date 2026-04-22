import { findChatResponse } from '../data/mockChatResponses';
import type { ChatMessage } from '../engines/types';
import { generateId } from './formatters';

export async function processMessage(userMessage: string): Promise<ChatMessage> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));

  const response = findChatResponse(userMessage);

  return {
    id: generateId(),
    role: 'assistant',
    content: response.response,
    timestamp: Date.now(),
    actions: response.actions,
  };
}
