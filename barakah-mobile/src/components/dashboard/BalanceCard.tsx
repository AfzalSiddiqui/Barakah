import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from '../ui/Typography';
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
  return (
    <LinearGradient
      colors={['#1C2333', '#0F1520']}
      className={`rounded-2xl p-5 border border-nb-green/10 ${className ?? ''}`}
    >
      <View className="flex-row justify-between items-start mb-4">
        <View>
          <Typography variant="caption" className="text-nb-muted">
            Total Balance
          </Typography>
          <Typography variant="h1" className="text-nb-text mt-1">
            {formatCurrency(balance, currency)}
          </Typography>
        </View>
        <ShariaComplianceBadge status={shariaStatus} size="sm" />
      </View>
      <View className="flex-row justify-between items-center">
        <Typography variant="caption" className="text-nb-muted">
          Account {accountNumber}
        </Typography>
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-nb-green mr-2" />
          <Typography variant="small" className="text-nb-green">
            AAOIFI Certified
          </Typography>
        </View>
      </View>
    </LinearGradient>
  );
}
