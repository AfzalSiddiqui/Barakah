import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { colors as themeColors } from '../../theme/colors';
import type { MurabahaProduct } from '../../engines/types';

interface IslamicProductCardProps {
  product: MurabahaProduct;
  selected: boolean;
  onSelect: () => void;
}

export function IslamicProductCard({ product, selected, onSelect }: IslamicProductCardProps) {
  const colors = useFluxColors();

  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.7}
      className="rounded-xl p-4"
      style={{
        backgroundColor: selected ? 'rgba(0, 212, 170, 0.08)' : themeColors.glass.bg,
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? '#00D4AA' : themeColors.glass.border,
      }}
    >
      <View className="items-center">
        <FluxText textStyle="title" style={{ marginBottom: 8 }}>
          {product.icon}
        </FluxText>
        <FluxText
          textStyle="caption"
          color={selected ? colors.success : colors.textPrimary}
          style={{ fontWeight: '600' }}
        >
          {product.name}
        </FluxText>
        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginTop: 4 }}>
          {`From ${(product.profitRate * 100).toFixed(1)}%`}
        </FluxText>
      </View>
    </TouchableOpacity>
  );
}
