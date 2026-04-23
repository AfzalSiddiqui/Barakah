import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
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
      className={`bg-nb-surface rounded-xl p-4 border-2 ${
        selected ? 'border-nb-green' : 'border-transparent'
      }`}
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
