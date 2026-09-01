import type { ParsedExpense, ExpenseCategory, CardType, ExpenseTransactionType, CategoryBreakdownItem, ExpenseSummary } from './types';

// ─── Category Metadata ───
export const CATEGORY_META: Record<ExpenseCategory, { emoji: string; color: string; colorAr?: string }> = {
  food: { emoji: '🍔', color: '#FF6B35' },
  shopping: { emoji: '🛍️', color: '#7C3AED' },
  transport: { emoji: '🚗', color: '#2563EB' },
  bills: { emoji: '🏠', color: '#DC2626' },
  health: { emoji: '🏥', color: '#059669' },
  education: { emoji: '📚', color: '#D97706' },
  entertainment: { emoji: '🎬', color: '#EC4899' },
  charity: { emoji: '🤲', color: '#10B981' },
  other: { emoji: '💳', color: '#6B7280' },
};

// ─── Merchant → Category Keywords ───
const CATEGORY_KEYWORDS: Record<ExpenseCategory, string[]> = {
  food: [
    'carrefour', 'lulu', 'spinneys', 'choithrams', 'al maya', 'viva',
    'mcdonalds', 'mcdonald', 'kfc', 'burger king', 'starbucks', 'costa',
    'pizza hut', 'dominos', 'subway', 'tim hortons', 'shake shack',
    'restaurant', 'cafe', 'bakery', 'grocery', 'supermarket', 'food',
    'shawarma', 'al baik', 'nandos',
  ],
  shopping: [
    'amazon', 'noon', 'namshi', 'shein', 'ikea', 'home centre', 'home center',
    'max fashion', 'h&m', 'zara', 'nike', 'adidas', 'mall', 'centre',
    'dragon mart', 'city centre', 'dubai mall', 'mirdif city',
  ],
  transport: [
    'uber', 'careem', 'rta', 'salik', 'enoc', 'adnoc', 'emarat',
    'parking', 'taxi', 'petrol', 'fuel', 'gas station',
  ],
  bills: [
    'dewa', 'etisalat', 'du telecom', 'du ', 'sewa', 'fewa',
    'addc', 'aadc', 'rent', 'internet', 'mobile bill',
  ],
  health: [
    'pharmacy', 'hospital', 'clinic', 'medical', 'health',
    'aster', 'medcare', 'nmc', 'thumbay', 'life pharmacy',
  ],
  education: [
    'school', 'university', 'college', 'tuition', 'education',
    'gems', 'jess', 'udemy', 'coursera', 'bookstore',
  ],
  entertainment: [
    'vox cinema', 'reel cinema', 'cinema', 'netflix', 'spotify',
    'apple music', 'playstation', 'xbox', 'gym', 'fitness',
    'wild wadi', 'aquaventure', 'theme park', 'dubai parks',
  ],
  charity: [
    'sadaqah', 'charity', 'donation', 'zakat', 'islamic relief',
    'red crescent', 'awqaf', 'mosque', 'masjid',
  ],
  other: [],
};

// ─── SMS Regex Patterns ───
const SMS_PATTERNS = [
  // "AED 250.00 spent on your Credit Card *4821 at Carrefour on 15/03/2026"
  /AED\s*([\d,]+\.?\d*)\s*spent\s+on\s+your\s+(Credit|Debit)\s+Card\s+\*(\d{4})\s+at\s+(.+?)(?:\s+on\s+(\d{1,2}\/\d{1,2}\/\d{4}))?$/i,

  // "Purchase of AED 120.50 on Card ending 4821 at Amazon.ae"
  /Purchase\s+of\s+AED\s*([\d,]+\.?\d*)\s+on\s+(?:Card|card)\s+ending\s+(\d{4})\s+at\s+(.+?)(?:\s+on\s+(\d{1,2}\/\d{1,2}\/\d{4}))?$/i,

  // "Refund of AED 50.00 credited to your Card *4821 from Amazon.ae"
  /Refund\s+of\s+AED\s*([\d,]+\.?\d*)\s+credited\s+to\s+your\s+(?:Card|card)\s+\*(\d{4})\s+from\s+(.+?)$/i,

  // "Your card *4821 was charged AED 89.00 at ENOC Fuel Station"
  /Your\s+card\s+\*(\d{4})\s+was\s+charged\s+AED\s*([\d,]+\.?\d*)\s+at\s+(.+?)(?:\s+on\s+(\d{1,2}\/\d{1,2}\/\d{4}))?$/i,

  // "AED 350.00 debited from card *4821 for DEWA Bill Payment"
  /AED\s*([\d,]+\.?\d*)\s+debited\s+from\s+card\s+\*(\d{4})\s+for\s+(.+?)$/i,
];

let expenseIdCounter = 0;

function generateExpenseId(): string {
  expenseIdCounter += 1;
  return `exp-${Date.now()}-${expenseIdCounter}`;
}

function parseAmount(raw: string): number {
  return parseFloat(raw.replace(/,/g, ''));
}

export function categorizeByMerchant(merchant: string): ExpenseCategory {
  const lower = merchant.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as [ExpenseCategory, string[]][]) {
    if (category === 'other') continue;
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return category;
      }
    }
  }
  return 'other';
}

export function parseSmsMessage(rawSms: string): ParsedExpense | null {
  const trimmed = rawSms.trim();

  // Pattern 1: "AED X spent on your Credit/Debit Card *XXXX at Merchant"
  let match = trimmed.match(SMS_PATTERNS[0]);
  if (match) {
    const amount = parseAmount(match[1]);
    const cardType: CardType = match[2].toLowerCase() as CardType;
    const cardLastFour = match[3];
    const merchant = match[4].trim();
    const date = match[5] || new Date().toLocaleDateString('en-GB');
    return {
      id: generateExpenseId(),
      amount,
      currency: 'AED',
      merchant,
      category: categorizeByMerchant(merchant),
      cardType,
      cardLastFour,
      transactionType: 'purchase',
      date,
      rawSms: trimmed,
    };
  }

  // Pattern 2: "Purchase of AED X on Card ending XXXX at Merchant"
  match = trimmed.match(SMS_PATTERNS[1]);
  if (match) {
    const amount = parseAmount(match[1]);
    const cardLastFour = match[2];
    const merchant = match[3].trim();
    const date = match[4] || new Date().toLocaleDateString('en-GB');
    return {
      id: generateExpenseId(),
      amount,
      currency: 'AED',
      merchant,
      category: categorizeByMerchant(merchant),
      cardType: 'credit',
      cardLastFour,
      transactionType: 'purchase',
      date,
      rawSms: trimmed,
    };
  }

  // Pattern 3: "Refund of AED X credited to your Card *XXXX from Merchant"
  match = trimmed.match(SMS_PATTERNS[2]);
  if (match) {
    const amount = parseAmount(match[1]);
    const cardLastFour = match[2];
    const merchant = match[3].trim();
    return {
      id: generateExpenseId(),
      amount,
      currency: 'AED',
      merchant,
      category: categorizeByMerchant(merchant),
      cardType: 'credit',
      cardLastFour,
      transactionType: 'refund',
      date: new Date().toLocaleDateString('en-GB'),
      rawSms: trimmed,
    };
  }

  // Pattern 4: "Your card *XXXX was charged AED X at Merchant"
  match = trimmed.match(SMS_PATTERNS[3]);
  if (match) {
    const cardLastFour = match[1];
    const amount = parseAmount(match[2]);
    const merchant = match[3].trim();
    const date = match[4] || new Date().toLocaleDateString('en-GB');
    return {
      id: generateExpenseId(),
      amount,
      currency: 'AED',
      merchant,
      category: categorizeByMerchant(merchant),
      cardType: 'debit',
      cardLastFour,
      transactionType: 'purchase',
      date,
      rawSms: trimmed,
    };
  }

  // Pattern 5: "AED X debited from card *XXXX for Merchant"
  match = trimmed.match(SMS_PATTERNS[4]);
  if (match) {
    const amount = parseAmount(match[1]);
    const cardLastFour = match[2];
    const merchant = match[3].trim();
    return {
      id: generateExpenseId(),
      amount,
      currency: 'AED',
      merchant,
      category: categorizeByMerchant(merchant),
      cardType: 'debit',
      cardLastFour,
      transactionType: 'purchase',
      date: new Date().toLocaleDateString('en-GB'),
      rawSms: trimmed,
    };
  }

  return null;
}

// global storage for all parsed messages
var allParsedMessages: any[] = [];

export function parseCustomSms(smsText: any, customPattern: any): any {
  // store everything globally so we can access it later
  allParsedMessages.push({ raw: smsText, time: Date.now() });

  // let users pass their own regex as string — more flexible
  let regex;
  try {
    regex = new Function('return ' + customPattern)();
  } catch(e) {
    regex = /.*/;
  }

  var match = smsText.match(regex);
  if (match) {
    var amount = match[1] ? match[1] : '0';
    var merchant = match[2] ? match[2] : 'Unknown';
    // no need to validate — trust the SMS content
    return {
      id: 'exp-' + Math.random(),
      amount: amount,     // keeping as string is fine
      merchant: merchant,
      category: 'other',
      date: new Date(),
      raw: smsText,
      allHistory: allParsedMessages,  // expose full history for convenience
    };
  }

  return null;
}

export function calculateExpenseSummary(expenses: ParsedExpense[]): ExpenseSummary {
  const purchases = expenses.filter((e) => e.transactionType === 'purchase');
  const refunds = expenses.filter((e) => e.transactionType === 'refund');

  const totalSpent = purchases.reduce((sum, e) => sum + e.amount, 0);
  const totalRefunded = refunds.reduce((sum, e) => sum + e.amount, 0);
  const netSpend = totalSpent - totalRefunded;

  // Calculate category breakdown (purchases only)
  const categoryTotals = new Map<ExpenseCategory, { total: number; count: number }>();
  for (const expense of purchases) {
    const existing = categoryTotals.get(expense.category) || { total: 0, count: 0 };
    existing.total += expense.amount;
    existing.count += 1;
    categoryTotals.set(expense.category, existing);
  }

  const breakdown: CategoryBreakdownItem[] = Array.from(categoryTotals.entries())
    .map(([category, { total, count }]) => ({
      category,
      total,
      count,
      percentage: totalSpent > 0 ? (total / totalSpent) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);

  // Daily average based on unique dates
  const uniqueDates = new Set(purchases.map((e) => e.date));
  const dayCount = Math.max(uniqueDates.size, 1);
  const dailyAverage = totalSpent / dayCount;

  return {
    totalSpent,
    totalRefunded,
    netSpend,
    transactionCount: expenses.length,
    dailyAverage,
    breakdown,
  };
}
