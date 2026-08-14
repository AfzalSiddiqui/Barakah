import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useFluxColors, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { Typography } from '../../src/components/ui/Typography';
import { Card } from '../../src/components/ui/Card';
import { BalanceCard } from '../../src/components/dashboard/BalanceCard';
import { TransactionItem } from '../../src/components/dashboard/TransactionItem';
import { QuickActionsGrid } from '../../src/components/dashboard/QuickActionsGrid';
import { ProfitShareWidget } from '../../src/components/islamic/ProfitShareWidget';
import {
  ExpenseSummaryCard,
  CategoryBreakdown,
  ExpenseItem,
  CategoryFilter,
  ExpensePieChart,
  DateFilterBar,
  AddExpenseModal,
} from '../../src/components/expense';
import { useAppStore } from '../../src/store/appStore';
import { useExpenseStore } from '../../src/store/expenseStore';
import { useRTL } from '../../src/hooks/useRTL';

export default function DashboardScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const colors = useFluxColors();
  const { user, transactions } = useAppStore();
  const { toggleLanguage, language, isRTL, textAlign } = useRTL();

  const {
    summary,
    selectedCategory,
    dateFilter,
    isLoaded,
    parseAllMockSms,
    setSelectedCategory,
    setDateFilter,
    addManualExpense,
    getFilteredExpenses,
    getFilteredSummary,
  } = useExpenseStore();

  const [showAddModal, setShowAddModal] = useState(false);

  // Auto-parse mock SMS on mount
  useEffect(() => {
    if (!isLoaded) {
      parseAllMockSms();
    }
  }, [isLoaded]);

  const filteredExpenses = getFilteredExpenses();
  const filteredSummary = getFilteredSummary();

  const quickActions = [
    { icon: '↗️', label: t('dashboard.transfer'), onPress: () => router.push('/transfer') },
    { icon: '📱', label: t('dashboard.pay'), onPress: () => router.push('/pay') },
    { icon: '📈', label: t('dashboard.invest'), onPress: () => router.push('/invest') },
    { icon: '🌐', label: language === 'en' ? 'عربي' : 'EN', onPress: toggleLanguage },
  ];

  return (
    <SafeAreaView className="flex-1 bg-nb-dark" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Typography variant="caption" className={`text-nb-muted ${textAlign}`}>
            {t('dashboard.greeting')}
          </Typography>
          <Typography variant="h2" className={`text-nb-text ${textAlign}`}>
            {isRTL ? user.nameAr : user.name}
          </Typography>
        </View>

        {/* Balance Card */}
        <View className="px-5 mt-2">
          <BalanceCard
            balance={user.balance}
            accountNumber={user.accountNumber}
            currency={user.currency}
            shariaStatus={user.shariaStatus}
          />
        </View>

        {/* Quick Actions */}
        <View className="px-5 mt-6">
          <Typography variant="captionBold" className={`text-nb-muted mb-4 ${textAlign}`}>
            {t('dashboard.quickActions')}
          </Typography>
          <QuickActionsGrid actions={quickActions} />
        </View>

        {/* Profit Share */}
        <View className="px-5 mt-6">
          <ProfitShareWidget
            amount={1875.25}
            period={isRTL ? 'الربع الأول 2026' : 'Q1 2026'}
            annualizedReturn={0.062}
          />
        </View>

        {/* Expense Summary Card */}
        {filteredSummary && filteredSummary.transactionCount > 0 && (
          <View className="px-5 mt-6">
            <ExpenseSummaryCard summary={filteredSummary} />
          </View>
        )}

        {/* Add Expense Button */}
        <View className="px-5 mt-4">
          <TouchableOpacity
            onPress={() => setShowAddModal(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: hexToRgba(colors.primary, 0.15),
              borderRadius: 12,
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: hexToRgba(colors.primary, 0.3),
              borderStyle: 'dashed',
            }}
          >
            <FluxText textStyle="caption" color={colors.primary} style={{ fontSize: 18, marginRight: 8 }}>
              +
            </FluxText>
            <FluxText textStyle="caption" color={colors.primary} style={{ fontWeight: '600' }}>
              {t('expenses.addExpense')}
            </FluxText>
          </TouchableOpacity>
        </View>

        {/* Date Filter */}
        <View className="px-5 mt-4">
          <DateFilterBar filter={dateFilter} onFilterChange={setDateFilter} />
        </View>

        {/* Category Filter chips */}
        <View className="mt-4">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </View>

        {/* Pie Chart */}
        {filteredSummary && filteredSummary.breakdown.length > 0 && (
          <View className="px-5 mt-4">
            <ExpensePieChart
              breakdown={filteredSummary.breakdown}
              totalSpent={filteredSummary.totalSpent}
            />
          </View>
        )}

        {/* Recent Transactions */}
        <View className="px-5 mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Typography variant="captionBold" className="text-nb-muted">
              {t('dashboard.recentTransactions')}
            </Typography>
            <Typography variant="small" className="text-nb-green">
              {t('common.viewAll')}
            </Typography>
          </View>
          <Card>
            {transactions.slice(0, 5).map((txn) => (
              <TransactionItem key={txn.id} transaction={txn} isRTL={isRTL} />
            ))}
          </Card>
        </View>

        {/* Category Breakdown bars */}
        {filteredSummary && filteredSummary.breakdown.length > 0 && (
          <View className="px-5 mt-6">
            <CategoryBreakdown breakdown={filteredSummary.breakdown} />
          </View>
        )}

        {/* Recent Expenses (filtered) */}
        {filteredExpenses.length > 0 && (
          <View className="px-5 mt-6 mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Typography variant="captionBold" className="text-nb-muted">
                {t('expenses.recentExpenses')}
              </Typography>
              <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
                {`${filteredExpenses.length} ${t('expenses.transactions')}`}
              </FluxText>
            </View>
            <Card>
              {filteredExpenses.slice(0, 10).map((expense) => (
                <ExpenseItem key={expense.id} expense={expense} />
              ))}
            </Card>
          </View>
        )}

        {/* Bottom spacer */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Floating Add Expense Button */}
      <TouchableOpacity
        onPress={() => setShowAddModal(true)}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
        }}
      >
        <FluxText textStyle="headline" color="#FFFFFF" style={{ fontSize: 24, marginTop: -2 }}>
          +
        </FluxText>
      </TouchableOpacity>

      {/* Add Expense Modal */}
      <AddExpenseModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addManualExpense}
      />
    </SafeAreaView>
  );
}
