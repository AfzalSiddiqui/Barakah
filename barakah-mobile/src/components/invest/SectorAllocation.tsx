import React from 'react';
import { View } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText, FluxProgressBar } from '@flux-ds/react-native-foundation';
import { sectorAllocation } from '../../data/mockInvestments';
import { useRTL } from '../../hooks/useRTL';

export function SectorAllocation() {
  const colors = useFluxColors();
  const { isRTL, flexRow } = useRTL();

  return (
    <View className="gap-2.5">
      {sectorAllocation.map((sector) => (
        <View key={sector.sector}>
          <View className={`${flexRow} justify-between mb-1`}>
            <FluxText textStyle="caption" color={colors.textPrimary}>
              {isRTL ? sector.sectorAr : sector.sector}
            </FluxText>
            <FluxText textStyle="caption" color={colors.textPrimary} style={{ fontWeight: '600' }}>
              {`${sector.percentage}%`}
            </FluxText>
          </View>
          <FluxProgressBar
            progress={sector.percentage / 100}
            height={8}
            trackColor={colors.border}
            progressColor={sector.color}
          />
        </View>
      ))}
    </View>
  );
}
