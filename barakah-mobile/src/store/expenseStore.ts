import { create } from 'zustand';
import type { ParsedExpense, ExpenseSummary, ExpenseCategory, ExpenseTransactionType, CardType } from '../engines/types';
import { parseSmsMessage, calculateExpenseSummary, categorizeByMerchant } from '../engines/smsParser';
import { mockSmsMessages } from '../data/mockSmsMessages';
import { createAuditEntry } from '../engines/auditLog';

export type DateFilterMode = 'all' | 'monthly' | 'custom';

export interface DateFilter {
  mode: DateFilterMode;
  month?: number; // 0-11
  year?: number;
  startDate?: string; // DD/MM/YYYY
  endDate?: string;   // DD/MM/YYYY
}

interface ExpenseState {
  expenses: ParsedExpense[];
  summary: ExpenseSummary | null;
  selectedCategory: ExpenseCategory | null;
  dateFilter: DateFilter;
  isLoaded: boolean;

  parseSms: (raw: string) => ParsedExpense | null;
  parseAllMockSms: () => void;
  setSelectedCategory: (category: ExpenseCategory | null) => void;
  setDateFilter: (filter: DateFilter) => void;
  addManualExpense: (expense: {
    amount: number;
    merchant: string;
    category?: ExpenseCategory;
    cardType: CardType;
    cardLastFour: string;
    transactionType: ExpenseTransactionType;
    date: string;
  }) => void;
  getFilteredExpenses: () => ParsedExpense[];
  getFilteredSummary: () => ExpenseSummary;
}

function parseDateString(dateStr: string): Date {
  // Handle DD/MM/YYYY format
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  }
  return new Date(dateStr);
}

function filterByDate(expenses: ParsedExpense[], filter: DateFilter): ParsedExpense[] {
  if (filter.mode === 'all') return expenses;

  if (filter.mode === 'monthly' && filter.month !== undefined && filter.year !== undefined) {
    return expenses.filter((e) => {
      const d = parseDateString(e.date);
      return d.getMonth() === filter.month && d.getFullYear() === filter.year;
    });
  }

  if (filter.mode === 'custom' && filter.startDate && filter.endDate) {
    const start = parseDateString(filter.startDate);
    const end = parseDateString(filter.endDate);
    return expenses.filter((e) => {
      const d = parseDateString(e.date);
      return d >= start && d <= end;
    });
  }

  return expenses;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  summary: null,
  selectedCategory: null,
  dateFilter: { mode: 'all' },
  isLoaded: false,

  parseSms: (raw: string) => {
    const parsed = parseSmsMessage(raw);
    if (!parsed) return null;

    set((state) => {
      const expenses = [...state.expenses, parsed];
      const filtered = filterByDate(expenses, state.dateFilter);
      return {
        expenses,
        summary: calculateExpenseSummary(filtered),
      };
    });

    createAuditEntry('expense_parsed', 'SMS expense parsed', {
      merchant: parsed.merchant,
      amount: parsed.amount,
      category: parsed.category,
    });

    return parsed;
  },

  parseAllMockSms: () => {
    const { isLoaded } = get();
    if (isLoaded) return;

    const parsed: ParsedExpense[] = [];
    for (const sms of mockSmsMessages) {
      const result = parseSmsMessage(sms);
      if (result) parsed.push(result);
    }

    set({
      expenses: parsed,
      summary: calculateExpenseSummary(parsed),
      isLoaded: true,
    });

    createAuditEntry('expense_parsed', 'Mock SMS batch parsed', {
      count: parsed.length,
    });
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setDateFilter: (filter: DateFilter) => {
    const { expenses } = get();
    const filtered = filterByDate(expenses, filter);
    set({
      dateFilter: filter,
      summary: calculateExpenseSummary(filtered),
    });
  },

  addManualExpense: (expense) => {
    const newExpense: ParsedExpense = {
      id: `exp-manual-${Date.now()}`,
      amount: expense.amount,
      currency: 'AED',
      merchant: expense.merchant,
      category: expense.category || categorizeByMerchant(expense.merchant),
      cardType: expense.cardType,
      cardLastFour: expense.cardLastFour,
      transactionType: expense.transactionType,
      date: expense.date,
      rawSms: `Manual: ${expense.merchant} - AED ${expense.amount}`,
    };

    set((state) => {
      const expenses = [...state.expenses, newExpense];
      const filtered = filterByDate(expenses, state.dateFilter);
      return {
        expenses,
        summary: calculateExpenseSummary(filtered),
      };
    });

    createAuditEntry('expense_parsed', 'Manual expense added', {
      merchant: newExpense.merchant,
      amount: newExpense.amount,
      category: newExpense.category,
    });
  },

  getFilteredExpenses: () => {
    const { expenses, dateFilter, selectedCategory } = get();
    let filtered = filterByDate(expenses, dateFilter);
    if (selectedCategory) {
      filtered = filtered.filter((e) => e.category === selectedCategory);
    }
    return filtered;
  },

  getFilteredSummary: () => {
    const { expenses, dateFilter } = get();
    const filtered = filterByDate(expenses, dateFilter);
    return calculateExpenseSummary(filtered);
  },
}));
