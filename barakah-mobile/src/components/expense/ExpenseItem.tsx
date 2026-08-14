import React from 'react';
import { View } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { formatCurrency } from '../../lib/formatters';
import { CATEGORY_META } from '../../engines/smsParser';
import type { ParsedExpense } from '../../engines/types';

interface ExpenseItemProps {
  expense: ParsedExpense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const colors = useFluxColors();
  const isRefund = expense.transactionType === 'refund';
  const meta = CATEGORY_META[expense.category];

  return (
    <View
      className="flex-row items-center py-2.5"
      style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.06)' }}
    >
      <View
        className="w-9 h-9 rounded-full items-center justify-center mr-2.5"
        style={{ backgroundColor: `${meta.color}20` }}
      >
        <FluxText textStyle="body">
          {meta.emoji}
        </FluxText>
      </View>
      <View className="flex-1">
        <FluxText textStyle="caption" color={colors.textPrimary} style={{ fontWeight: '600' }}>
          {expense.merchant}
        </FluxText>
        <View className="flex-row items-center mt-0.5">
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
            {expense.date}
          </FluxText>
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginHorizontal: 4 }}>
            ·
          </FluxText>
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, textTransform: 'capitalize' }}>
            {`${expense.cardType} *${expense.cardLastFour}`}
          </FluxText>
        </View>
      </View>
      <FluxText
        textStyle="caption"
        color={isRefund ? colors.success : colors.error}
        style={{ fontWeight: '600' }}
      >
        {`${isRefund ? '+' : '-'}${formatCurrency(expense.amount)}`}
      </FluxText>
    </View>
  );
}
