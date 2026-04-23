import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { ShariaComplianceBadge } from '../islamic/ShariaComplianceBadge';
import { formatCurrency } from '../../lib/formatters';
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
    <LinearGradient
      colors={[colors.secondary, colors.background]}
      className={`rounded-2xl p-5 border border-nb-green/10 ${className ?? ''}`}
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
  );
}
