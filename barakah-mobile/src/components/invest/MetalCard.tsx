import React from 'react';
import { View } from 'react-native';
import { Typography } from '../ui/Typography';
import { Badge } from '../ui/Badge';
import type { MetalHolding } from '../../engines/types';
import { useRTL } from '../../hooks/useRTL';

interface MetalCardProps {
  metal: MetalHolding;
}

export function MetalCard({ metal }: MetalCardProps) {
  const { isRTL, flexRow } = useRTL();

  const totalValue = metal.weightGrams * metal.currentPricePerGram;
  const totalCost = metal.weightGrams * metal.purchasePricePerGram;
  const pl = totalValue - totalCost;
  const plPercent = ((pl / totalCost) * 100).toFixed(1);
  const plColor = pl >= 0 ? 'text-nb-green' : 'text-nb-red';
  const icon = metal.type === 'gold' ? '🥇' : '🥈';

  return (
    <View className="bg-nb-surface rounded-xl p-3 mb-2">
      <View className={`${flexRow} justify-between items-center`}>
        <View className={`${flexRow} items-center gap-2 flex-1`}>
          <Typography variant="h3">{icon}</Typography>
          <View>
            <Typography variant="bodyBold" className="text-nb-text">
              {isRTL ? metal.nameAr : metal.name}
            </Typography>
            <Typography variant="small" className="text-nb-muted">
              {metal.weightGrams}g @ {metal.currentPricePerGram.toFixed(2)} {metal.currency}
            </Typography>
          </View>
        </View>
        <View className="items-end">
          <Typography variant="bodyBold" className="text-nb-text">
            {totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} {metal.currency}
          </Typography>
          <Typography variant="small" className={plColor}>
            {pl >= 0 ? '+' : ''}{pl.toFixed(0)} ({plPercent}%)
          </Typography>
        </View>
      </View>
      <Badge label="Sharia Compliant" variant="success" className="mt-2" />
    </View>
  );
}
