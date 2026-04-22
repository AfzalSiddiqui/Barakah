import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Typography } from '../ui/Typography';
import { formatCurrency } from '../../lib/formatters';

interface ZakatProgressRingProps {
  zakatDue: number;
  netWealth: number;
  nisabThreshold: number;
  size?: number;
  className?: string;
}

export function ZakatProgressRing({
  zakatDue,
  netWealth,
  nisabThreshold,
  size = 160,
  className,
}: ZakatProgressRingProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = nisabThreshold > 0 ? Math.min(netWealth / nisabThreshold, 2) / 2 : 0;
  const strokeDashoffset = circumference * (1 - progress);
  const isAboveNisab = netWealth >= nisabThreshold;

  return (
    <View className={`items-center ${className ?? ''}`}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1C2333"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isAboveNisab ? '#D4A843' : '#6B7B8D'}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View className="absolute inset-0 items-center justify-center">
          <Typography variant="small" className="text-nb-muted">
            Zakat Due
          </Typography>
          <Typography variant="h3" className="text-nb-gold">
            {formatCurrency(zakatDue)}
          </Typography>
          <Typography variant="small" className="text-nb-muted">
            2.5%
          </Typography>
        </View>
      </View>
    </View>
  );
}
