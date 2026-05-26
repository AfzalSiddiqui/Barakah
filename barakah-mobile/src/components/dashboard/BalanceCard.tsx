import React from 'react';
import { View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { ShariaComplianceBadge } from '../islamic/ShariaComplianceBadge';
import { formatCurrency } from '../../lib/formatters';
import { colors as themeColors } from '../../theme/colors';
import type { ComplianceStatus } from '../../engines/types';

interface BalanceCardProps {
  balance: number;
  accountNumber: string;
  currency: string;
  shariaStatus: ComplianceStatus;
  className?: string;
}

export function BalanceCard({
  balance,
  accountNumber,
  currency,
  shariaStatus,
  className,
}: BalanceCardProps) {
  const colors = useFluxColors();

  return (
    <View
      className={`rounded-2xl overflow-hidden ${className ?? ''}`}
      style={{
        borderWidth: 1,
        borderColor: themeColors.glass.borderLight,
      }}
    >
      <BlurView
        intensity={30}
        tint="dark"
        style={{
          backgroundColor: Platform.OS === 'android' ? 'rgba(0, 212, 170, 0.06)' : undefined,
        }}
      >
        <LinearGradient
          colors={[...themeColors.gradients.glassGreen] as [string, string]}
          className="p-5"
        >
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <FluxText textStyle="caption" color={colors.textSecondary}>
                Total Balance
              </FluxText>
              <FluxText textStyle="title" color={colors.textPrimary} style={{ marginTop: 4 }}>
                {formatCurrency(balance, currency)}
              </FluxText>
            </View>
            <ShariaComplianceBadge status={shariaStatus} size="sm" />
          </View>
          <View className="flex-row justify-between items-center">
            <FluxText textStyle="caption" color={colors.textSecondary}>
              {`Account ${accountNumber}`}
            </FluxText>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-nb-green mr-2" />
              <FluxText textStyle="caption" color={colors.success} style={{ fontSize: 10 }}>
                AAOIFI Certified
              </FluxText>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
}
