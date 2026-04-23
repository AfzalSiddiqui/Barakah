import React from 'react';
import { View } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText, FluxDivider } from '@flux-ds/react-native-foundation';
import { formatCurrency, formatDate } from '../../lib/formatters';
import type { Transaction } from '../../engines/types';

interface TransactionItemProps {
  transaction: Transaction;
  isRTL?: boolean;
}

const categoryIcons: Record<string, string> = {
  salary: '💰',
  transfer: '↔️',
  payment: '📄',
  investment: '📈',
  zakat: '🕌',
  profit_share: '✨',
};

export function TransactionItem({ transaction, isRTL = false }: TransactionItemProps) {
  const colors = useFluxColors();
  const isCredit = transaction.type === 'credit';

  return (
    <View className="flex-row items-center py-2.5 border-b border-nb-surface">
      <View className="w-9 h-9 rounded-full bg-nb-surface items-center justify-center mr-2.5">
        <FluxText textStyle="body">
          {categoryIcons[transaction.category] ?? '💳'}
        </FluxText>
      </View>
      <View className="flex-1">
        <FluxText textStyle="caption" color={colors.textPrimary} style={{ fontWeight: '600' }}>
          {isRTL ? transaction.descriptionAr : transaction.description}
        </FluxText>
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
          {formatDate(transaction.date)}
        </FluxText>
      </View>
      <FluxText
        textStyle="caption"
        color={isCredit ? colors.success : colors.error}
        style={{ fontWeight: '600' }}
      >
        {`${isCredit ? '+' : '-'}${formatCurrency(transaction.amount)}`}
      </FluxText>
    </View>
  );
}
