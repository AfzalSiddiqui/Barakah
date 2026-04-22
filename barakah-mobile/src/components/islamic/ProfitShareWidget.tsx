import React from 'react';
import { View } from 'react-native';
import { Card } from '../ui/Card';
import { Typography } from '../ui/Typography';
import { formatCurrency } from '../../lib/formatters';

interface ProfitShareWidgetProps {
  amount: number;
  period: string;
  annualizedReturn: number;
  className?: string;
}

export function ProfitShareWidget({
  amount,
  period,
  annualizedReturn,
  className,
}: ProfitShareWidgetProps) {
  const isPositive = amount >= 0;
  const colorClass = isPositive ? 'text-nb-green' : 'text-nb-red';
  const bgClass = isPositive ? 'bg-nb-green/20' : 'bg-nb-red/20';
  const sign = isPositive ? '+' : '-';

  return (
    <Card className={`${className ?? ''}`}>
      <View className="flex-row justify-between items-center mb-3">
        <Typography variant="captionBold" className="text-nb-muted">
          Profit Share
        </Typography>
        <Typography variant="small" className="text-nb-gold">
          {period}
        </Typography>
      </View>
      <Typography variant="h3" className={`${colorClass} mb-1`}>
        {sign}{formatCurrency(Math.abs(amount))}
      </Typography>
      <View className="flex-row items-center">
        <View className={`${bgClass} rounded-full px-2 py-0.5 mr-2`}>
          <Typography variant="small" className={colorClass}>
            {isPositive ? '+' : ''}{(annualizedReturn * 100).toFixed(1)}% APR
          </Typography>
        </View>
        <Typography variant="small" className="text-nb-muted">
          Mudarabah Return
        </Typography>
      </View>
    </Card>
  );
}
