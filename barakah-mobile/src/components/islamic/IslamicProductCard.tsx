import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '../ui/Typography';
import type { MurabahaProduct } from '../../engines/types';

interface IslamicProductCardProps {
  product: MurabahaProduct;
  selected: boolean;
  onSelect: () => void;
}

export function IslamicProductCard({ product, selected, onSelect }: IslamicProductCardProps) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.7}
      className={`bg-nb-surface rounded-xl p-4 border-2 ${
        selected ? 'border-nb-green' : 'border-transparent'
      }`}
    >
      <View className="items-center">
        <Typography variant="h2" className="mb-2">
          {product.icon}
        </Typography>
        <Typography
          variant="captionBold"
          className={selected ? 'text-nb-green' : 'text-nb-text'}
        >
          {product.name}
        </Typography>
        <Typography variant="small" className="text-nb-muted mt-1">
          From {(product.profitRate * 100).toFixed(1)}%
        </Typography>
      </View>
    </TouchableOpacity>
  );
}
