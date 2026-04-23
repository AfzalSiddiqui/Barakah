import React from 'react';
import { View } from 'react-native';
import { useFluxColors, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import type { ComplianceStatus } from '../../engines/types';

interface ShariaComplianceBadgeProps {
  status: ComplianceStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

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
  const colors = useFluxColors();

  const statusConfig: Record<ComplianceStatus, { color: string; bg: string; label: string; icon: string }> = {
    compliant: { color: colors.success, bg: hexToRgba(colors.success, 0.2), label: 'Sharia Compliant', icon: '✓' },
    non_compliant: { color: colors.error, bg: hexToRgba(colors.error, 0.2), label: 'Non-Compliant', icon: '✗' },
    review_required: { color: colors.warning, bg: hexToRgba(colors.warning, 0.2), label: 'Review Required', icon: '!' },
    pending: { color: colors.textSecondary, bg: hexToRgba(colors.textSecondary, 0.2), label: 'Pending Review', icon: '…' },
  };

  const config = statusConfig[status];
  const fontSize = size === 'sm' ? 10 : 12;
  const labelFontSize = size === 'lg' ? 14 : size === 'sm' ? 10 : 12;

  return (
    <View
      className={`flex-row items-center rounded-full ${sizeClasses[size]} ${className ?? ''}`}
      style={{ backgroundColor: config.bg }}
    >
      <FluxText textStyle="caption" color={config.color} style={{ fontSize, marginRight: 4, fontWeight: '600' }}>
        {config.icon}
      </FluxText>
      {showLabel && (
        <FluxText textStyle="caption" color={config.color} style={{ fontSize: labelFontSize, fontWeight: '600' }}>
          {config.label}
        </FluxText>
      )}
    </View>
  );
}
