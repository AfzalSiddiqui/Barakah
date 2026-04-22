import React from 'react';
import { View } from 'react-native';
import { Typography } from '../ui/Typography';
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
  const isCredit = transaction.type === 'credit';

  return (
    <View className="flex-row items-center py-2.5 border-b border-nb-surface">
      <View className="w-9 h-9 rounded-full bg-nb-surface items-center justify-center mr-2.5">
        <Typography variant="body">
          {categoryIcons[transaction.category] ?? '💳'}
        </Typography>
      </View>
      <View className="flex-1">
        <Typography variant="captionBold" className="text-nb-text">
          {isRTL ? transaction.descriptionAr : transaction.description}
        </Typography>
        <Typography variant="small" className="text-nb-muted">
          {formatDate(transaction.date)}
        </Typography>
      </View>
      <Typography
        variant="captionBold"
        className={isCredit ? 'text-nb-green' : 'text-nb-red'}
      >
        {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
      </Typography>
    </View>
  );
}
