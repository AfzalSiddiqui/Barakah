import type { ChatMessage, ChatAction } from '../engines/types';

interface MockResponse {
  keywords: string[];
  response: string;
  actions?: ChatAction[];
}

export const mockChatResponses: MockResponse[] = [
  {
    keywords: ['balance', 'how much', 'account', 'money'],
    response: 'Your current balance is AED125,750.50. Your account is fully Sharia-compliant with AAOIFI certification. You received AED1,875.25 in profit share this quarter.',
    actions: [
      { id: 'a1', label: 'View Transactions', type: 'navigate', payload: 'dashboard' },
      { id: 'a2', label: 'Calculate Zakat', type: 'navigate', payload: 'zakat' },
    ],
  },
  {
    keywords: ['zakat', 'zakah', 'purify'],
    response: 'Based on your current assets of AED125,750.50, your estimated Zakat due is AED3,143.76 (2.5% of net zakatable wealth). This is above the Nisab threshold. Would you like a detailed breakdown?',
    actions: [
      { id: 'a3', label: 'Open Calculator', type: 'navigate', payload: 'zakat' },
      { id: 'a4', label: 'Pay Zakat', type: 'calculate' },
    ],
  },
  {
    keywords: ['halal', 'haram', 'screening', 'investment', 'portfolio'],
    response: 'Your portfolio screening shows 4 out of 5 investments are Halal-compliant. Acme Finance Corp (ACMF) failed multiple AAOIFI screening criteria including debt ratio and haram revenue. I recommend reviewing or divesting.',
    actions: [
      { id: 'a5', label: 'View Screening', type: 'navigate', payload: 'zakat' },
      { id: 'a6', label: 'Get Alternatives', type: 'info' },
    ],
  },
  {
    keywords: ['murabaha', 'finance', 'loan', 'car', 'home', 'buy'],
    response: 'Barakah offers Sharia-compliant Murabaha financing for auto, home, personal goods, and business equipment. Rates start at 4.5% profit margin with full AAOIFI compliance. No hidden fees, no interest — guaranteed.',
    actions: [
      { id: 'a7', label: 'Calculate Murabaha', type: 'navigate', payload: 'murabaha' },
      { id: 'a8', label: 'Compare Products', type: 'info' },
    ],
  },
  {
    keywords: ['transfer', 'send', 'pay'],
    response: 'I can help you with transfers. Your recent transfer was AED5,000 to Savings on April 8th. All your transfers are logged in our immutable audit trail for full compliance transparency.',
    actions: [
      { id: 'a9', label: 'New Transfer', type: 'calculate' },
      { id: 'a10', label: 'View History', type: 'navigate', payload: 'dashboard' },
    ],
  },
  {
    keywords: ['sharia', 'compliant', 'compliance', 'aaoifi'],
    response: 'Your account maintains full AAOIFI compliance. All 6 Sharia governance checks pass: No Riba, No Gharar, Asset-Backed, Halal Activity, Profit-Loss Sharing, and Full Disclosure. Last audit: today.',
    actions: [
      { id: 'a11', label: 'View Audit Log', type: 'info' },
    ],
  },
  {
    keywords: ['profit', 'share', 'earning', 'return'],
    response: 'Your profit share for Q1 2026 was AED1,875.25 — a 6.2% annualized return on your Mudarabah deposits. This is above the market average of 5.1% for Islamic banking products.',
    actions: [
      { id: 'a12', label: 'View Details', type: 'navigate', payload: 'dashboard' },
    ],
  },
];

export const defaultResponse: MockResponse = {
  keywords: [],
  response: "I understand your question. As your AI financial assistant, I can help with balance inquiries, Zakat calculations, Halal investment screening, Murabaha financing, transfers, and Sharia compliance checks. What would you like to explore?",
  actions: [
    { id: 'ad1', label: 'Check Balance', type: 'calculate' },
    { id: 'ad2', label: 'Calculate Zakat', type: 'navigate', payload: 'zakat' },
    { id: 'ad3', label: 'Halal Screening', type: 'navigate', payload: 'zakat' },
  ],
};

export function findChatResponse(input: string): MockResponse {
  const lower = input.toLowerCase();
  return (
    mockChatResponses.find((r) => r.keywords.some((k) => lower.includes(k))) ??
    defaultResponse
  );
}
