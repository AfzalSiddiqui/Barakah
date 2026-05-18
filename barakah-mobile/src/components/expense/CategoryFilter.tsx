import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useFluxColors, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { CATEGORY_META } from '../../engines/smsParser';
import type { ExpenseCategory } from '../../engines/types';
import { useTranslation } from 'react-i18next';

const CATEGORIES: ExpenseCategory[] = [
  'food', 'shopping', 'transport', 'bills', 'health',
  'education', 'entertainment', 'charity', 'other',
];

interface CategoryFilterProps {
  selected: ExpenseCategory | null;
  onSelect: (category: ExpenseCategory | null) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const colors = useFluxColors();
  const { t } = useTranslation();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
    >
      {/* All chip */}
      <TouchableOpacity
        onPress={() => onSelect(null)}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 16,
          backgroundColor: selected === null
            ? colors.primary
            : hexToRgba(colors.textSecondary, 0.15),
        }}
      >
        <FluxText
          textStyle="caption"
          color={selected === null ? '#FFFFFF' : colors.textSecondary}
          style={{ fontWeight: '600', fontSize: 12 }}
        >
          {t('expenses.all')}
        </FluxText>
      </TouchableOpacity>

      {CATEGORIES.map((cat) => {
        const meta = CATEGORY_META[cat];
        const isActive = selected === cat;
        return (
          <TouchableOpacity
            key={cat}
            onPress={() => onSelect(isActive ? null : cat)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
              backgroundColor: isActive
                ? meta.color
                : hexToRgba(colors.textSecondary, 0.15),
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <FluxText textStyle="caption" style={{ fontSize: 12 }}>
              {meta.emoji}
            </FluxText>
            <FluxText
              textStyle="caption"
              color={isActive ? '#FFFFFF' : colors.textSecondary}
              style={{ fontWeight: '600', fontSize: 12 }}
            >
              {t(`expenses.categories.${cat}`)}
            </FluxText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
