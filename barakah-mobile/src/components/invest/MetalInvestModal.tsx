import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useFluxColors, FluxSpacing, FluxRadius, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { useTranslation } from 'react-i18next';
import { useInvestStore } from '../../store/investStore';
import { useRTL } from '../../hooks/useRTL';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { MetalInvestFrequency } from '../../engines/types';

const FREQUENCIES: MetalInvestFrequency[] = ['daily', 'monthly', 'one_time'];

const PRESET_AMOUNTS = [50, 100, 250, 500, 1000];

export function MetalInvestModal() {
  const { t } = useTranslation();
  const colors = useFluxColors();
  const { isRTL, flexRow } = useRTL();
  const { investModalVisible, investModalMetal, metals, closeInvestModal, createPlan } =
    useInvestStore();

  const [frequency, setFrequency] = useState<MetalInvestFrequency>('monthly');
  const [amount, setAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const metal = metals.find((m) => m.type === investModalMetal);
  if (!metal) return null;

  const icon = metal.type === 'gold' ? '🥇' : '🥈';
  const metalColor = metal.type === 'gold' ? '#C9A84C' : '#C0C0C0';
  const numAmount = parseFloat(amount) || 0;
  const estimatedGrams = numAmount > 0 ? numAmount / metal.currentPricePerGram : 0;

  const handleConfirm = () => {
    if (numAmount <= 0) return;
    createPlan(metal.type, frequency, numAmount);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setAmount('');
      setFrequency('monthly');
    }, 2000);
  };

  const handleClose = () => {
    closeInvestModal();
    setAmount('');
    setFrequency('monthly');
    setShowSuccess(false);
  };

  const frequencyLabels: Record<MetalInvestFrequency, string> = {
    daily: t('invest.freqDaily'),
    monthly: t('invest.freqMonthly'),
    one_time: t('invest.freqOneTime'),
  };

  const frequencyIcons: Record<MetalInvestFrequency, string> = {
    daily: '📅',
    monthly: '🗓️',
    one_time: '💰',
  };

  return (
    <Modal visible={investModalVisible} transparent animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={handleClose}
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <View className="flex-1" />
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View
              style={{
                backgroundColor: colors.secondary,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingBottom: Platform.OS === 'ios' ? 34 : 20,
              }}
            >
              {showSuccess ? (
                <View className="items-center py-10 px-5">
                  <FluxText textStyle="headline" style={{ fontSize: 48 }}>✅</FluxText>
                  <FluxText
                    textStyle="headline"
                    color={colors.success}
                    style={{ fontWeight: '700', fontSize: 18, marginTop: 16 }}
                  >
                    {t('invest.investSuccess')}
                  </FluxText>
                  <FluxText
                    textStyle="body"
                    color={colors.textSecondary}
                    style={{ marginTop: 8, textAlign: 'center' }}
                  >
                    {frequency === 'one_time'
                      ? t('invest.oneTimeDone')
                      : t('invest.planCreated')}
                  </FluxText>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Handle */}
                  <View className="items-center pt-3 pb-1">
                    <View
                      style={{
                        width: 40,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: colors.textSecondary,
                        opacity: 0.4,
                      }}
                    />
                  </View>

                  {/* Header */}
                  <View className="px-5 pt-3 pb-4">
                    <View className={`${flexRow} items-center gap-3`}>
                      <FluxText textStyle="headline" style={{ fontSize: 32 }}>{icon}</FluxText>
                      <View className="flex-1">
                        <FluxText
                          textStyle="headline"
                          color={colors.textPrimary}
                          style={{ fontWeight: '700', fontSize: 18 }}
                        >
                          {`${t('invest.investIn')} ${isRTL ? metal.nameAr : metal.name}`}
                        </FluxText>
                        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 11 }}>
                          {`${metal.currentPricePerGram.toFixed(2)} ${metal.currency}/${t('invest.perGram')}`}
                        </FluxText>
                      </View>
                    </View>
                    <Badge label={t('invest.shariaCompliant')} variant="success" className="mt-2" />
                  </View>

                  {/* Frequency Selection */}
                  <View className="px-5 mb-4">
                    <FluxText
                      textStyle="caption"
                      color={colors.textSecondary}
                      style={{ fontWeight: '600', marginBottom: 10, textAlign: isRTL ? 'right' : 'left' }}
                    >
                      {t('invest.selectFrequency')}
                    </FluxText>
                    <View className={`${flexRow} gap-2`}>
                      {FREQUENCIES.map((freq) => {
                        const isSelected = frequency === freq;
                        return (
                          <TouchableOpacity
                            key={freq}
                            onPress={() => setFrequency(freq)}
                            className="flex-1 items-center py-3 rounded-xl"
                            style={{
                              backgroundColor: isSelected
                                ? hexToRgba(metalColor, 0.2)
                                : colors.surface,
                              borderWidth: isSelected ? 1.5 : 1,
                              borderColor: isSelected ? metalColor : colors.border,
                              borderRadius: FluxRadius.lg,
                            }}
                          >
                            <FluxText textStyle="body" style={{ fontSize: 18 }}>
                              {frequencyIcons[freq]}
                            </FluxText>
                            <FluxText
                              textStyle="caption"
                              color={isSelected ? metalColor : colors.textSecondary}
                              style={{ fontWeight: '600', marginTop: 4, fontSize: 11 }}
                            >
                              {frequencyLabels[freq]}
                            </FluxText>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* Amount Input */}
                  <View className="px-5 mb-3">
                    <Input
                      label={
                        frequency === 'one_time'
                          ? t('invest.amountLabel')
                          : `${t('invest.amountPer')} ${frequencyLabels[frequency]}`
                      }
                      value={amount}
                      onChangeText={setAmount}
                      keyboardType="numeric"
                      placeholder={`0.00 ${metal.currency}`}
                    />
                  </View>

                  {/* Preset Amounts */}
                  <View className="px-5 mb-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <View className={`${flexRow} gap-2`}>
                        {PRESET_AMOUNTS.map((preset) => (
                          <TouchableOpacity
                            key={preset}
                            onPress={() => setAmount(String(preset))}
                            style={{
                              backgroundColor:
                                amount === String(preset)
                                  ? hexToRgba(metalColor, 0.2)
                                  : colors.surface,
                              borderWidth: 1,
                              borderColor:
                                amount === String(preset) ? metalColor : colors.border,
                              borderRadius: FluxRadius.md,
                              paddingHorizontal: FluxSpacing.sm,
                              paddingVertical: FluxSpacing.xs,
                            }}
                          >
                            <FluxText
                              textStyle="caption"
                              color={
                                amount === String(preset) ? metalColor : colors.textSecondary
                              }
                              style={{ fontWeight: '600', fontSize: 12 }}
                            >
                              {`${preset} ${metal.currency}`}
                            </FluxText>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </View>

                  {/* Estimation */}
                  {numAmount > 0 && (
                    <View
                      className="mx-5 mb-4 p-3 rounded-xl"
                      style={{
                        backgroundColor: hexToRgba(metalColor, 0.08),
                        borderWidth: 1,
                        borderColor: hexToRgba(metalColor, 0.2),
                        borderRadius: FluxRadius.lg,
                      }}
                    >
                      <View className={`${flexRow} justify-between items-center mb-2`}>
                        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 11 }}>
                          {t('invest.estimatedGrams')}
                        </FluxText>
                        <FluxText
                          textStyle="body"
                          color={metalColor}
                          style={{ fontWeight: '700', fontSize: 15 }}
                        >
                          {`${estimatedGrams.toFixed(4)}g`}
                        </FluxText>
                      </View>
                      <View className={`${flexRow} justify-between items-center`}>
                        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 11 }}>
                          {t('invest.currentPrice')}
                        </FluxText>
                        <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 11 }}>
                          {`${metal.currentPricePerGram.toFixed(2)} ${metal.currency}/g`}
                        </FluxText>
                      </View>
                      {frequency !== 'one_time' && (
                        <View className={`${flexRow} justify-between items-center mt-2`}>
                          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 11 }}>
                            {t('invest.yearlyEstimate')}
                          </FluxText>
                          <FluxText
                            textStyle="caption"
                            color={colors.textPrimary}
                            style={{ fontWeight: '600', fontSize: 11 }}
                          >
                            {`${(numAmount * (frequency === 'daily' ? 365 : 12)).toLocaleString()} ${metal.currency}`}
                          </FluxText>
                        </View>
                      )}
                    </View>
                  )}

                  {/* Confirm Button */}
                  <View className="px-5 mb-4">
                    <Button
                      label={
                        frequency === 'one_time'
                          ? t('invest.buyNow')
                          : t('invest.startPlan')
                      }
                      variant="primary"
                      size="lg"
                      disabled={numAmount <= 0}
                      onPress={handleConfirm}
                      className="w-full"
                    />
                  </View>
                </ScrollView>
              )}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}
