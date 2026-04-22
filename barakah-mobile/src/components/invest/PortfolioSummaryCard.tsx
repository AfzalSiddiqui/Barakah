import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { Typography } from '../ui/Typography';
import { usePortfolioTotals } from '../../store/investStore';
import { useRTL } from '../../hooks/useRTL';

export function PortfolioSummaryCard() {
  const { t } = useTranslation();
  const { totalValue, dailyPL, totalPL, halalPercent, stockValue, metalValue } = usePortfolioTotals();
  const { isRTL, flexRow, textAlign } = useRTL();

  const plColor = dailyPL >= 0 ? 'text-nb-green' : 'text-nb-red';
  const plSign = dailyPL >= 0 ? '+' : '';
  const totalPlColor = totalPL >= 0 ? 'text-nb-green' : 'text-nb-red';
  const totalPlSign = totalPL >= 0 ? '+' : '';

  return (
    <Card variant="elevated">
      <Typography variant="caption" className={`text-nb-muted ${textAlign}`}>
        {t('invest.portfolioValue')}
      </Typography>
      <Typography variant="h1" className={`text-nb-text mt-1 ${textAlign}`}>
        AED {totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
      </Typography>

      <View className={`${flexRow} mt-3 gap-4`}>
        <View className="flex-1">
          <Typography variant="small" className="text-nb-muted">
            {t('invest.dailyPL')}
          </Typography>
          <Typography variant="bodyBold" className={plColor}>
            {plSign}{dailyPL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
        </View>
        <View className="flex-1">
          <Typography variant="small" className="text-nb-muted">
            {t('invest.totalPL')}
          </Typography>
          <Typography variant="bodyBold" className={totalPlColor}>
            {totalPlSign}{totalPL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
        </View>
        <View className="flex-1">
          <Typography variant="small" className="text-nb-muted">
            {t('invest.halalCompliance')}
          </Typography>
          <Typography variant="bodyBold" className="text-nb-green">
            {halalPercent}%
          </Typography>
        </View>
      </View>

      <View className="h-px bg-nb-muted/20 my-3" />

      <View className={`${flexRow} gap-4`}>
        <View className="flex-1">
          <Typography variant="small" className="text-nb-muted">
            {t('invest.stocks')}
          </Typography>
          <Typography variant="captionBold" className="text-nb-text">
            AED {stockValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </Typography>
        </View>
        <View className="flex-1">
          <Typography variant="small" className="text-nb-muted">
            {t('invest.metals')}
          </Typography>
          <Typography variant="captionBold" className="text-nb-text">
            AED {metalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </Typography>
        </View>
      </View>
    </Card>
  );
}
