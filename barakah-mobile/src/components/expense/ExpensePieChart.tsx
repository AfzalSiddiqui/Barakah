import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import Svg, { Path, G } from 'react-native-svg';
import { Card } from '../ui/Card';
import { CATEGORY_META } from '../../engines/smsParser';
import type { CategoryBreakdownItem } from '../../engines/types';
import { useTranslation } from 'react-i18next';

interface ExpensePieChartProps {
  breakdown: CategoryBreakdownItem[];
  totalSpent: number;
}

interface SliceData {
  path: string;
  color: string;
  category: string;
  percentage: number;
  total: number;
  emoji: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function createArcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

export function ExpensePieChart({ breakdown, totalSpent }: ExpensePieChartProps) {
  const colors = useFluxColors();
  const { t } = useTranslation();
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null);

  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 80;

  if (breakdown.length === 0) return null;

  // Build slices
  const slices: SliceData[] = [];
  let currentAngle = 0;

  for (const item of breakdown) {
    const sliceAngle = (item.percentage / 100) * 360;
    if (sliceAngle < 0.5) continue; // skip tiny slices
    const meta = CATEGORY_META[item.category];
    const path = createArcPath(cx, cy, radius, currentAngle, currentAngle + sliceAngle);
    slices.push({
      path,
      color: meta.color,
      category: item.category,
      percentage: item.percentage,
      total: item.total,
      emoji: meta.emoji,
    });
    currentAngle += sliceAngle;
  }


  return (
    <Card>
      <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontWeight: '600', marginBottom: 12 }}>
        {t('expenses.spendingChart')}
      </FluxText>

      <View className="items-center">
        <View style={{ width: size, height: size }}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <G>
              {slices.map((slice, i) => (
                <Path
                  key={slice.category}
                  d={slice.path}
                  fill={slice.color}
                  opacity={selectedSlice === null || selectedSlice === i ? 1 : 0.3}
                  onPress={() => setSelectedSlice(selectedSlice === i ? null : i)}
                />
              ))}
            </G>
          </Svg>
          {/* Center dot overlay */}
          <View
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            pointerEvents="none"
          >
            <View
              style={{
                width: radius * 0.5,
                height: radius * 0.5,
                borderRadius: radius,
                backgroundColor: colors.background,
              }}
            />
          </View>
        </View>

        {/* Legend */}
        <View className="flex-row flex-wrap justify-center mt-3" style={{ gap: 8 }}>
          {slices.map((slice, i) => (
            <TouchableOpacity
              key={slice.category}
              onPress={() => setSelectedSlice(selectedSlice === i ? null : i)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
                backgroundColor: selectedSlice === i ? `${slice.color}30` : 'transparent',
              }}
            >
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: slice.color, marginRight: 4 }} />
              <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
                {t(`expenses.categories.${slice.category}`)}
              </FluxText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Card>
  );
}
