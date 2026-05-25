import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useFluxColors, FluxSpacing, FluxRadius, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/Badge';
import type { MetalHolding } from '../../engines/types';
import { useRTL } from '../../hooks/useRTL';
import { useInvestStore } from '../../store/investStore';

interface MetalCardProps {
  metal: MetalHolding;
}

export function MetalCard({ metal }: MetalCardProps) {
  const { t } = useTranslation();
  const colors = useFluxColors();
  const { isRTL, flexRow } = useRTL();
  const openInvestModal = useInvestStore((s) => s.openInvestModal);

  const totalValue = metal.weightGrams * metal.currentPricePerGram;
  const totalCost = metal.weightGrams * metal.purchasePricePerGram;
  const pl = totalValue - totalCost;
  const plPercent = ((pl / totalCost) * 100).toFixed(1);
  const plColor = pl >= 0 ? colors.success : colors.error;
  const icon = metal.type === 'gold' ? '🥇' : '🥈';
  const metalColor = metal.type === 'gold' ? '#D4A843' : '#C0C0C0';

  return (
    <View className="bg-nb-surface rounded-xl p-3 mb-2">
      <View className={`${flexRow} justify-between items-center`}>
        <View className={`${flexRow} items-center gap-2 flex-1`}>
          <FluxText textStyle="headline">{icon}</FluxText>
          <View>
            <FluxText textStyle="body" color={colors.textPrimary} style={{ fontWeight: '600', fontSize: 14 }}>
              {isRTL ? metal.nameAr : metal.name}
            </FluxText>
            <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
              {`${metal.weightGrams.toFixed(2)}g @ ${metal.currentPricePerGram.toFixed(2)} ${metal.currency}`}
            </FluxText>
          </View>
        </View>
        <View className="items-end">
          <FluxText textStyle="body" color={colors.textPrimary} style={{ fontWeight: '600', fontSize: 14 }}>
            {`${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${metal.currency}`}
          </FluxText>
          <FluxText textStyle="caption" color={plColor} style={{ fontSize: 10 }}>
            {`${pl >= 0 ? '+' : ''}${pl.toFixed(0)} (${plPercent}%)`}
          </FluxText>
        </View>
      </View>
      <View className={`${flexRow} items-center justify-between mt-2`}>
        <Badge label={t('invest.shariaCompliant')} variant="success" />
        <TouchableOpacity
          onPress={() => openInvestModal(metal.type)}
          style={{
            backgroundColor: hexToRgba(metalColor, 0.2),
            paddingHorizontal: FluxSpacing.md,
            paddingVertical: FluxSpacing.xs,
            borderRadius: FluxRadius.full,
            borderWidth: 1,
            borderColor: hexToRgba(metalColor, 0.4),
          }}
        >
          <FluxText
            textStyle="caption"
            color={metalColor}
            style={{ fontWeight: '700', fontSize: 11 }}
          >
            {t('invest.investButton')}
          </FluxText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
