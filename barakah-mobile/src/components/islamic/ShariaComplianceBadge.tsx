import React from 'react';
import { View } from 'react-native';
import { Typography } from '../ui/Typography';
import type { ComplianceStatus } from '../../engines/types';

interface ShariaComplianceBadgeProps {
  status: ComplianceStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const statusConfig: Record<ComplianceStatus, { color: string; bg: string; label: string; icon: string }> = {
  compliant: { color: 'text-nb-green', bg: 'bg-nb-green/20', label: 'Sharia Compliant', icon: '✓' },
  non_compliant: { color: 'text-nb-red', bg: 'bg-nb-red/20', label: 'Non-Compliant', icon: '✗' },
  review_required: { color: 'text-nb-gold', bg: 'bg-nb-gold/20', label: 'Review Required', icon: '!' },
  pending: { color: 'text-nb-muted', bg: 'bg-nb-muted/20', label: 'Pending Review', icon: '…' },
};

const sizeClasses = {
  sm: 'px-2 py-0.5',
  md: 'px-3 py-1',
  lg: 'px-4 py-2',
};

export function ShariaComplianceBadge({
  status,
  size = 'md',
  showLabel = true,
  className,
}: ShariaComplianceBadgeProps) {
  const config = statusConfig[status];

  return (
    <View className={`flex-row items-center ${config.bg} rounded-full ${sizeClasses[size]} ${className ?? ''}`}>
      <Typography
        variant={size === 'sm' ? 'small' : 'captionBold'}
        className={`${config.color} mr-1`}
      >
        {config.icon}
      </Typography>
      {showLabel && (
        <Typography
          variant={size === 'sm' ? 'small' : size === 'lg' ? 'bodyBold' : 'captionBold'}
          className={config.color}
        >
          {config.label}
        </Typography>
      )}
    </View>
  );
}
