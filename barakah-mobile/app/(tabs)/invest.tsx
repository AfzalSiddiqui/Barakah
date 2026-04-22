import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../src/components/ui/Typography';
import { Card } from '../../src/components/ui/Card';
import { PortfolioSummaryCard } from '../../src/components/invest/PortfolioSummaryCard';
import { MetalCard } from '../../src/components/invest/MetalCard';
import { HoldingRow } from '../../src/components/invest/HoldingRow';
import { WatchlistItem } from '../../src/components/invest/WatchlistItem';
import { SectorAllocation } from '../../src/components/invest/SectorAllocation';
import { useInvestStore } from '../../src/store/investStore';
import { useRTL } from '../../src/hooks/useRTL';

export default function InvestScreen() {
  const { t } = useTranslation();
  const { holdings, metals, watchlist, expandedHoldingId, toggleExpanded } = useInvestStore();
  const { isRTL, textAlign } = useRTL();

  return (
    <SafeAreaView className="flex-1 bg-nb-dark" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Typography variant="h2" className={`text-nb-text ${textAlign}`}>
            {t('invest.title')}
          </Typography>
          <Typography variant="caption" className={`text-nb-muted ${textAlign}`}>
            {t('invest.subtitle')}
          </Typography>
        </View>

        {/* Portfolio Summary */}
        <View className="px-5 mt-2">
          <PortfolioSummaryCard />
        </View>

        {/* Precious Metals */}
        <View className="px-5 mt-6">
          <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
            {t('invest.preciousMetals')}
          </Typography>
          {metals.map((metal) => (
            <MetalCard key={metal.id} metal={metal} />
          ))}
        </View>

        {/* Halal Stocks */}
        <View className="px-5 mt-6">
          <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
            {t('invest.halalStocks')}
          </Typography>
          {holdings.map((holding) => (
            <HoldingRow
              key={holding.id}
              holding={holding}
              isExpanded={expandedHoldingId === holding.id}
              onToggle={() => toggleExpanded(holding.id)}
            />
          ))}
        </View>

        {/* Watchlist */}
        <View className="px-5 mt-6">
          <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
            {t('invest.watchlist')}
          </Typography>
          <Card>
            {watchlist.map((item) => (
              <WatchlistItem key={item.id} item={item} />
            ))}
          </Card>
        </View>

        {/* Sector Allocation */}
        <View className="px-5 mt-6 mb-6">
          <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
            {t('invest.sectorAllocation')}
          </Typography>
          <Card>
            <SectorAllocation />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
