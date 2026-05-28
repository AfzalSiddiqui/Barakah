import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, TextInput, ScrollView, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useFluxColors, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { Card } from '../ui/Card';
import { CATEGORY_META } from '../../engines/smsParser';
import { colors as themeColors } from '../../theme/colors';
import type { ExpenseCategory, CardType, ExpenseTransactionType } from '../../engines/types';
import { useTranslation } from 'react-i18next';

const CATEGORIES: ExpenseCategory[] = [
  'food', 'shopping', 'transport', 'bills', 'health',
  'education', 'entertainment', 'charity', 'other',
];

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (expense: {
    amount: number;
    merchant: string;
    category: ExpenseCategory;
    cardType: CardType;
    cardLastFour: string;
    transactionType: ExpenseTransactionType;
    date: string;
  }) => void;
}

export function AddExpenseModal({ visible, onClose, onAdd }: AddExpenseModalProps) {
  const colors = useFluxColors();
  const { t } = useTranslation();

  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('other');
  const [cardType, setCardType] = useState<CardType>('credit');
  const [cardLastFour, setCardLastFour] = useState('');
  const [transactionType, setTransactionType] = useState<ExpenseTransactionType>('purchase');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-GB'));

  const handleAdd = () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || !merchant.trim()) return;

    onAdd({
      amount: parsedAmount,
      merchant: merchant.trim(),
      category,
      cardType,
      cardLastFour: cardLastFour || '0000',
      transactionType,
      date,
    });

    // Reset form
    setAmount('');
    setMerchant('');
    setCategory('other');
    setCardLastFour('');
    setDate(new Date().toLocaleDateString('en-GB'));
    onClose();
  };

  const inputStyle = {
    borderWidth: 1,
    borderColor: themeColors.glass.border,
    borderRadius: 8,
    padding: 10,
    color: colors.textPrimary,
    marginBottom: 12,
    fontSize: 14,
    backgroundColor: themeColors.glass.bg,
  };

  const glassChipInactive = {
    backgroundColor: themeColors.glass.bg,
    borderWidth: 1,
    borderColor: themeColors.glass.border,
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <View
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: '85%',
            overflow: 'hidden',
            borderWidth: 1,
            borderBottomWidth: 0,
            borderColor: themeColors.glass.border,
          }}
        >
          <BlurView
            intensity={40}
            tint="dark"
            style={{
              backgroundColor: Platform.OS === 'android' ? '#0A0E17' : undefined,
            }}
          >
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              {/* Handle */}
              <View className="items-center mb-4">
                <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: themeColors.glass.borderLight }} />
              </View>

              <FluxText textStyle="headline" color={colors.textPrimary} style={{ marginBottom: 20 }}>
                {t('expenses.addExpense')}
              </FluxText>

              {/* Transaction Type */}
              <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 4 }}>
                {t('expenses.type')}
              </FluxText>
              <View className="flex-row mb-3" style={{ gap: 8 }}>
                {(['purchase', 'refund'] as ExpenseTransactionType[]).map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setTransactionType(type)}
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      borderRadius: 8,
                      alignItems: 'center',
                      ...(transactionType === type
                        ? { backgroundColor: type === 'purchase' ? colors.error : colors.success }
                        : glassChipInactive),
                    }}
                  >
                    <FluxText
                      textStyle="caption"
                      color={transactionType === type ? '#FFFFFF' : colors.textSecondary}
                      style={{ fontWeight: '600' }}
                    >
                      {t(`expenses.${type}`)}
                    </FluxText>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Amount */}
              <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 4 }}>
                {t('expenses.amount')} (AED)
              </FluxText>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor={hexToRgba(colors.textSecondary, 0.5)}
                style={inputStyle}
              />

              {/* Merchant */}
              <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 4 }}>
                {t('expenses.merchant')}
              </FluxText>
              <TextInput
                value={merchant}
                onChangeText={setMerchant}
                placeholder={t('expenses.merchantPlaceholder')}
                placeholderTextColor={hexToRgba(colors.textSecondary, 0.5)}
                style={inputStyle}
              />

              {/* Date */}
              <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 4 }}>
                {t('expenses.date')} (DD/MM/YYYY)
              </FluxText>
              <TextInput
                value={date}
                onChangeText={setDate}
                placeholder="15/05/2026"
                placeholderTextColor={hexToRgba(colors.textSecondary, 0.5)}
                style={inputStyle}
              />

              {/* Category */}
              <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 6 }}>
                {t('expenses.category')}
              </FluxText>
              <View className="flex-row flex-wrap mb-3" style={{ gap: 6 }}>
                {CATEGORIES.map((cat) => {
                  const meta = CATEGORY_META[cat];
                  const isActive = category === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setCategory(cat)}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 14,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                        ...(isActive
                          ? { backgroundColor: meta.color }
                          : glassChipInactive),
                      }}
                    >
                      <FluxText textStyle="caption" style={{ fontSize: 12 }}>
                        {meta.emoji}
                      </FluxText>
                      <FluxText
                        textStyle="caption"
                        color={isActive ? '#FFFFFF' : colors.textSecondary}
                        style={{ fontSize: 11 }}
                      >
                        {t(`expenses.categories.${cat}`)}
                      </FluxText>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Card Type */}
              <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 4 }}>
                {t('expenses.cardType')}
              </FluxText>
              <View className="flex-row mb-3" style={{ gap: 8 }}>
                {(['credit', 'debit'] as CardType[]).map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setCardType(type)}
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      borderRadius: 8,
                      alignItems: 'center',
                      ...(cardType === type
                        ? { backgroundColor: colors.primary }
                        : glassChipInactive),
                    }}
                  >
                    <FluxText
                      textStyle="caption"
                      color={cardType === type ? '#FFFFFF' : colors.textSecondary}
                      style={{ fontWeight: '600' }}
                    >
                      {t(`expenses.${type}`)}
                    </FluxText>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Card Last Four */}
              <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginBottom: 4 }}>
                {t('expenses.cardLastFour')}
              </FluxText>
              <TextInput
                value={cardLastFour}
                onChangeText={setCardLastFour}
                keyboardType="numeric"
                maxLength={4}
                placeholder="4821"
                placeholderTextColor={hexToRgba(colors.textSecondary, 0.5)}
                style={inputStyle}
              />

              {/* Action buttons */}
              <View className="flex-row mt-2" style={{ gap: 12 }}>
                <TouchableOpacity
                  onPress={onClose}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 12,
                    alignItems: 'center',
                    backgroundColor: themeColors.glass.bg,
                    borderWidth: 1,
                    borderColor: themeColors.glass.border,
                  }}
                >
                  <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontWeight: '600' }}>
                    {t('common.cancel')}
                  </FluxText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAdd}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 12,
                    alignItems: 'center',
                    backgroundColor: colors.primary,
                  }}
                >
                  <FluxText textStyle="caption" color="#FFFFFF" style={{ fontWeight: '600' }}>
                    {t('expenses.addExpense')}
                  </FluxText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </BlurView>
        </View>
      </View>
    </Modal>
  );
}
