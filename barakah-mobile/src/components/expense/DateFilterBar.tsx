import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useFluxColors, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { Card } from '../ui/Card';
import { useTranslation } from 'react-i18next';
import type { DateFilter, DateFilterMode } from '../../store/expenseStore';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

interface DateFilterBarProps {
  filter: DateFilter;
  onFilterChange: (filter: DateFilter) => void;
}

export function DateFilterBar({ filter, onFilterChange }: DateFilterBarProps) {
  const colors = useFluxColors();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const modes: { key: DateFilterMode; label: string }[] = [
    { key: 'all', label: t('expenses.allTime') },
    { key: 'monthly', label: t('expenses.monthly') },
    { key: 'custom', label: t('expenses.custom') },
  ];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const handleModeSelect = (mode: DateFilterMode) => {
    if (mode === 'all') {
      onFilterChange({ mode: 'all' });
    } else if (mode === 'monthly') {
      onFilterChange({ mode: 'monthly', month: currentMonth, year: currentYear });
    } else {
      setShowCustomModal(true);
    }
  };

  const handleMonthSelect = (month: number) => {
    onFilterChange({ mode: 'monthly', month, year: filter.year || currentYear });
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onFilterChange({ mode: 'custom', startDate: customStart, endDate: customEnd });
      setShowCustomModal(false);
    }
  };

  return (
    <View>
      {/* Mode selector */}
      <View className="flex-row" style={{ gap: 8 }}>
        {modes.map((mode) => (
          <TouchableOpacity
            key={mode.key}
            onPress={() => handleModeSelect(mode.key)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 16,
              backgroundColor: filter.mode === mode.key
                ? colors.primary
                : hexToRgba(colors.textSecondary, 0.15),
            }}
          >
            <FluxText
              textStyle="caption"
              color={filter.mode === mode.key ? '#FFFFFF' : colors.textSecondary}
              style={{ fontWeight: '600', fontSize: 12 }}
            >
              {mode.label}
            </FluxText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Monthly picker - show months when in monthly mode */}
      {filter.mode === 'monthly' && (
        <View className="flex-row flex-wrap mt-2" style={{ gap: 6 }}>
          {MONTHS.map((m, i) => {
            const isActive = filter.month === i;
            const monthLabel = isAr ? MONTHS_AR[i] : m;
            return (
              <TouchableOpacity
                key={m}
                onPress={() => handleMonthSelect(i)}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 12,
                  backgroundColor: isActive
                    ? colors.primary
                    : hexToRgba(colors.textSecondary, 0.1),
                }}
              >
                <FluxText
                  textStyle="caption"
                  color={isActive ? '#FFFFFF' : colors.textSecondary}
                  style={{ fontSize: 11 }}
                >
                  {monthLabel}
                </FluxText>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Custom date range info */}
      {filter.mode === 'custom' && filter.startDate && filter.endDate && (
        <TouchableOpacity onPress={() => setShowCustomModal(true)} className="mt-2">
          <FluxText textStyle="caption" color={colors.primary} style={{ fontSize: 11 }}>
            {filter.startDate} → {filter.endDate}
          </FluxText>
        </TouchableOpacity>
      )}

      {/* Custom date range modal */}
      <Modal visible={showCustomModal} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <Card className="mx-8" style={{ width: 300 }}>
            <FluxText textStyle="caption" color={colors.textPrimary} style={{ fontWeight: '700', marginBottom: 16 }}>
              {t('expenses.customRange')}
            </FluxText>

            <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 4 }}>
              {t('expenses.startDate')} (DD/MM/YYYY)
            </FluxText>
            <TextInput
              value={customStart}
              onChangeText={setCustomStart}
              placeholder="01/05/2026"
              placeholderTextColor={hexToRgba(colors.textSecondary, 0.5)}
              style={{
                borderWidth: 1,
                borderColor: hexToRgba(colors.textSecondary, 0.3),
                borderRadius: 8,
                padding: 10,
                color: colors.textPrimary,
                marginBottom: 12,
                fontSize: 14,
              }}
            />

            <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 4 }}>
              {t('expenses.endDate')} (DD/MM/YYYY)
            </FluxText>
            <TextInput
              value={customEnd}
              onChangeText={setCustomEnd}
              placeholder="31/05/2026"
              placeholderTextColor={hexToRgba(colors.textSecondary, 0.5)}
              style={{
                borderWidth: 1,
                borderColor: hexToRgba(colors.textSecondary, 0.3),
                borderRadius: 8,
                padding: 10,
                color: colors.textPrimary,
                marginBottom: 16,
                fontSize: 14,
              }}
            />

            <View className="flex-row justify-end" style={{ gap: 12 }}>
              <TouchableOpacity onPress={() => setShowCustomModal(false)}>
                <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontWeight: '600' }}>
                  {t('common.cancel')}
                </FluxText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCustomApply}>
                <FluxText textStyle="caption" color={colors.primary} style={{ fontWeight: '600' }}>
                  {t('common.confirm')}
                </FluxText>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
}
