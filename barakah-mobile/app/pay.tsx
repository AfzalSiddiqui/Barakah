import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Typography } from '../src/components/ui/Typography';
import { Card } from '../src/components/ui/Card';
import { Input } from '../src/components/ui/Input';
import { Button } from '../src/components/ui/Button';
import { TransactionItem } from '../src/components/dashboard/TransactionItem';
import { usePayStore } from '../src/store/payStore';
import { useAppStore } from '../src/store/appStore';
import { useRTL } from '../src/hooks/useRTL';
import { billCategories } from '../src/data/mockBeneficiaries';

export default function PayScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isRTL, textAlign, flexRow } = useRTL();
  const { transactions } = useAppStore();
  const {
    billers,
    selectedCategory,
    form,
    success,
    setField,
    selectCategory,
    selectBiller,
    pay,
    reset,
  } = usePayStore();

  const recentPayments = transactions.filter((txn) => txn.category === 'payment');

  if (success) {
    return (
      <SafeAreaView className="flex-1 bg-nb-dark" edges={['top']}>
        <View className="flex-1 items-center justify-center px-5">
          <Typography variant="h1" className="mb-2">✅</Typography>
          <Typography variant="h2" className={`text-nb-green mb-2 ${textAlign}`}>
            {t('pay.success')}
          </Typography>
          <Typography variant="body" className={`text-nb-muted mb-4 ${textAlign}`}>
            {form.biller} — AED {form.amount}
          </Typography>
          <Button label={t('common.done')} onPress={reset} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-nb-dark" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <TouchableOpacity onPress={() => router.back()} className="mb-2 self-start">
            <Typography variant="body" className="text-nb-green">
              {isRTL ? '→' : '←'} {t('common.back')}
            </Typography>
          </TouchableOpacity>
          <Typography variant="h2" className={`text-nb-text ${textAlign}`}>
            {t('pay.title')}
          </Typography>
          <Typography variant="caption" className={`text-nb-muted ${textAlign}`}>
            {t('pay.subtitle')}
          </Typography>
        </View>

        {/* Bill Categories Grid */}
        <View className="px-5 mt-4">
          <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
            {t('pay.categories')}
          </Typography>
          <View className="flex-row flex-wrap gap-3">
            {billCategories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                className={`w-[30%] items-center py-3 rounded-xl ${
                  selectedCategory === cat.id ? 'bg-nb-green/20 border border-nb-green' : 'bg-nb-card'
                }`}
                onPress={() => selectCategory(selectedCategory === cat.id ? null : cat.id)}
                activeOpacity={0.7}
              >
                <Typography variant="h3" className="mb-1">{cat.icon}</Typography>
                <Typography
                  variant="small"
                  className={selectedCategory === cat.id ? 'text-nb-green' : 'text-nb-muted'}
                >
                  {t(`pay.categoryLabels.${cat.label}`)}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Pay - Saved Billers */}
        <View className="px-5 mt-6">
          <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
            {t('pay.quickPay')}
          </Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className={`${flexRow} gap-4`}>
              {billers.map((b) => (
                <TouchableOpacity
                  key={b.id}
                  className="items-center w-16"
                  onPress={() => selectBiller(b)}
                  activeOpacity={0.7}
                >
                  <View className="w-12 h-12 rounded-full bg-nb-surface items-center justify-center mb-1">
                    <Typography variant="h3">{b.icon}</Typography>
                  </View>
                  <Typography variant="small" className="text-nb-text text-center" numberOfLines={1}>
                    {isRTL ? b.nameAr : b.name}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Pay Form */}
        <View className="px-5 mt-6">
          <Card>
            <Input
              label={t('pay.biller')}
              value={form.biller}
              onChangeText={(v) => setField('biller', v)}
              placeholder="e.g. DEWA"
              className="mb-3"
            />
            <Input
              label={t('pay.reference')}
              value={form.reference}
              onChangeText={(v) => setField('reference', v)}
              placeholder="Account / Reference Number"
              className="mb-3"
            />
            <Input
              label={t('pay.amount')}
              value={form.amount}
              onChangeText={(v) => setField('amount', v)}
              placeholder="0.00"
              keyboardType="numeric"
              className="mb-4"
            />
            <Button
              label={t('pay.payNow')}
              onPress={pay}
              disabled={!form.biller || !form.reference || !form.amount}
            />
          </Card>
        </View>

        {/* Recent Payments */}
        {recentPayments.length > 0 && (
          <View className="px-5 mt-6 mb-6">
            <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
              {t('pay.recentPayments')}
            </Typography>
            <Card>
              {recentPayments.map((txn) => (
                <TransactionItem key={txn.id} transaction={txn} isRTL={isRTL} />
              ))}
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
