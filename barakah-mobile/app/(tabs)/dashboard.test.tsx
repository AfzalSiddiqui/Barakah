import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import DashboardScreen from './dashboard';

const mockReact = React;
const mockNative = { Text, TouchableOpacity, View };
const mockPush = jest.fn();
const mockToggleLanguage = jest.fn();
const mockParseAllMockSms = jest.fn();
const mockSetSelectedCategory = jest.fn();
const mockSetDateFilter = jest.fn();
const mockAddManualExpense = jest.fn();

const mockUser = {
  name: 'Amina Ahmed', nameAr: 'أمينة أحمد', balance: 1200, accountNumber: '1234',
  currency: 'AED', shariaStatus: 'compliant',
};

let mockExpenseState: Record<string, unknown>;

jest.mock('expo-router', () => ({ useRouter: () => ({ push: mockPush }) }));
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => mockReact.createElement(mockNative.View, null, children),
}));
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
jest.mock('@flux-ds/react-native-ds', () => ({
  useFluxColors: () => ({ primary: '#0a0', textSecondary: '#777' }), hexToRgba: (color: string) => color,
}));
jest.mock('@flux-ds/react-native-foundation', () => ({
  FluxText: ({ children }: { children: React.ReactNode }) => mockReact.createElement(mockNative.Text, null, children),
}));
jest.mock('../../src/components/ui/Typography', () => ({
  Typography: ({ children }: { children: React.ReactNode }) => mockReact.createElement(mockNative.Text, null, children),
}));
jest.mock('../../src/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => mockReact.createElement(mockNative.View, null, children),
}));
jest.mock('../../src/components/dashboard/BalanceCard', () => ({ BalanceCard: () => mockReact.createElement(mockNative.View, { testID: 'balance-card' }) }));
jest.mock('../../src/components/dashboard/TransactionItem', () => ({ TransactionItem: () => mockReact.createElement(mockNative.View, { testID: 'transaction-item' }) }));
jest.mock('../../src/components/dashboard/QuickActionsGrid', () => ({
  QuickActionsGrid: ({ actions }: { actions: Array<{ label: string; onPress: () => void }> }) => (
    mockReact.createElement(mockNative.View, null, actions.map((action) => (
      mockReact.createElement(mockNative.TouchableOpacity, { key: action.label, testID: `quick-action-${action.label}`, onPress: action.onPress },
        mockReact.createElement(mockNative.Text, null, action.label))
    )))
  ),
}));
jest.mock('../../src/components/islamic/ProfitShareWidget', () => ({ ProfitShareWidget: () => mockReact.createElement(mockNative.View, { testID: 'profit-share' }) }));
jest.mock('../../src/components/expense', () => ({
  ExpenseSummaryCard: () => mockReact.createElement(mockNative.View, { testID: 'expense-summary' }),
  CategoryBreakdown: () => mockReact.createElement(mockNative.View, { testID: 'category-breakdown' }),
  ExpenseItem: () => mockReact.createElement(mockNative.View, { testID: 'expense-item' }),
  CategoryFilter: () => mockReact.createElement(mockNative.View, { testID: 'category-filter' }),
  ExpensePieChart: () => mockReact.createElement(mockNative.View, { testID: 'expense-pie-chart' }),
  DateFilterBar: () => mockReact.createElement(mockNative.View, { testID: 'date-filter' }),
  AddExpenseModal: ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
    visible ? mockReact.createElement(mockNative.TouchableOpacity, { testID: 'expense-modal', onPress: onClose },
      mockReact.createElement(mockNative.Text, null, 'close')) : null
  ),
}));
jest.mock('../../src/store/appStore', () => ({
  useAppStore: () => ({ user: mockUser, transactions: [{ id: 'txn-1' }] }),
}));
jest.mock('../../src/store/expenseStore', () => ({ useExpenseStore: () => mockExpenseState }));
jest.mock('../../src/hooks/useRTL', () => ({
  useRTL: () => ({ toggleLanguage: mockToggleLanguage, language: 'en', isRTL: false, textAlign: 'text-left' }),
}));

function createExpenseState(overrides: Record<string, unknown> = {}) {
  return {
    summary: null, selectedCategory: null, dateFilter: { mode: 'all' }, isLoaded: false,
    parseAllMockSms: mockParseAllMockSms, setSelectedCategory: mockSetSelectedCategory,
    setDateFilter: mockSetDateFilter, addManualExpense: mockAddManualExpense,
    getFilteredExpenses: () => [],
    getFilteredSummary: () => ({ transactionCount: 0, breakdown: [], totalSpent: 0 }),
    ...overrides,
  };
}

describe('DashboardScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockExpenseState = createExpenseState();
  });

  it('loads mock expenses once when the expense store has not been initialized', () => {
    render(<DashboardScreen />);
    expect(mockParseAllMockSms).toHaveBeenCalledTimes(1);
  });

  it('does not reload mock expenses after the store is initialized', () => {
    mockExpenseState = createExpenseState({ isLoaded: true });
    render(<DashboardScreen />);
    expect(mockParseAllMockSms).not.toHaveBeenCalled();
  });

  it.each([['dashboard.transfer', '/transfer'], ['dashboard.pay', '/pay'], ['dashboard.invest', '/invest']])(
    'navigates to %s from its quick action', (label, destination) => {
      const screen = render(<DashboardScreen />);
      fireEvent.press(screen.getByTestId(`quick-action-${label}`));
      expect(mockPush).toHaveBeenCalledWith(destination);
    },
  );

  it('switches language from the quick action', () => {
    const screen = render(<DashboardScreen />);
    fireEvent.press(screen.getByTestId('quick-action-عربي'));
    expect(mockToggleLanguage).toHaveBeenCalledTimes(1);
  });

  it('shows expense insights only when filtered expenses are available', () => {
    mockExpenseState = createExpenseState({
      getFilteredExpenses: () => [{ id: 'expense-1' }],
      getFilteredSummary: () => ({ transactionCount: 1, breakdown: [{ category: 'food' }], totalSpent: 50 }),
    });
    const screen = render(<DashboardScreen />);
    expect(screen.getByTestId('expense-summary')).toBeOnTheScreen();
    expect(screen.getByTestId('expense-pie-chart')).toBeOnTheScreen();
    expect(screen.getByTestId('category-breakdown')).toBeOnTheScreen();
    expect(screen.getByTestId('expense-item')).toBeOnTheScreen();
  });

  it('opens and closes the manual-expense modal', () => {
    const screen = render(<DashboardScreen />);
    fireEvent.press(screen.getByText('expenses.addExpense'));
    expect(screen.getByTestId('expense-modal')).toBeOnTheScreen();
    fireEvent.press(screen.getByTestId('expense-modal'));
    expect(screen.queryByTestId('expense-modal')).toBeNull();
  });
});
