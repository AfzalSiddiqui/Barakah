import React from 'react';
import { View } from 'react-native';
import { Typography } from '../ui/Typography';
import { sectorAllocation } from '../../data/mockInvestments';
import { useRTL } from '../../hooks/useRTL';

export function SectorAllocation() {
  const { isRTL, flexRow } = useRTL();

  return (
    <View className="gap-2.5">
      {sectorAllocation.map((sector) => (
        <View key={sector.sector}>
          <View className={`${flexRow} justify-between mb-1`}>
            <Typography variant="caption" className="text-nb-text">
              {isRTL ? sector.sectorAr : sector.sector}
            </Typography>
            <Typography variant="captionBold" className="text-nb-text">
              {sector.percentage}%
            </Typography>
          </View>
          <View className="h-2 bg-nb-muted/20 rounded-full overflow-hidden">
            <View
              className="h-full rounded-full"
              style={{ width: `${sector.percentage}%`, backgroundColor: sector.color }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
