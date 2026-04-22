import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Typography } from '../src/components/ui/Typography';
import { Card } from '../src/components/ui/Card';
import { Input } from '../src/components/ui/Input';
import { Button } from '../src/components/ui/Button';
import { Badge } from '../src/components/ui/Badge';
import { TransactionItem } from '../src/components/dashboard/TransactionItem';
import { useTransferStore } from '../src/store/transferStore';
import { useAppStore } from '../src/store/appStore';
import { useRTL } from '../src/hooks/useRTL';

export default function TransferScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isRTL, textAlign, flexRow } = useRTL();
  const { transactions } = useAppStore();
  const {
    beneficiaries,
    form,
    success,
    setField,
    selectBeneficiary,
    send,
    reset,
  } = useTransferStore();

  const recentTransfers = transactions.filter((txn) => txn.category === 'transfer');

  if (success) {
    return (
      <SafeAreaView className="flex-1 bg-nb-dark" edges={['top']}>
        <View className="flex-1 items-center justify-center px-5">
          <Typography variant="h1" className="mb-2">✅</Typography>
          <Typography variant="h2" className={`text-nb-green mb-2 ${textAlign}`}>
            {t('transfer.success')}
          </Typography>
          <Typography variant="body" className={`text-nb-muted mb-1 ${textAlign}`}>
            {form.recipient} — AED {form.amount}
          </Typography>
          <Badge
            label={t('transfer.complianceNote')}
            variant="success"
            className="mt-3 mb-6"
          />
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
            {t('transfer.title')}
          </Typography>
          <Typography variant="caption" className={`text-nb-muted ${textAlign}`}>
            {t('transfer.subtitle')}
          </Typography>
        </View>

        {/* Quick Transfer */}
        <View className="px-5 mt-4">
          <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
            {t('transfer.quickTransfer')}
          </Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className={`${flexRow} gap-4`}>
              {beneficiaries.map((b) => (
                <TouchableOpacity
                  key={b.id}
                  className="items-center w-16"
                  onPress={() => selectBeneficiary(b)}
                  activeOpacity={0.7}
                >
                  <View className="w-12 h-12 rounded-full bg-nb-surface items-center justify-center mb-1">
                    <Typography variant="h3">{b.avatar}</Typography>
                  </View>
                  <Typography variant="small" className="text-nb-text text-center" numberOfLines={1}>
                    {isRTL ? b.nameAr.split(' ')[0] : b.name.split(' ')[0]}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Transfer Form */}
        <View className="px-5 mt-6">
          <Card>
            <Input
              label={t('transfer.recipient')}
              value={form.recipient}
              onChangeText={(v) => setField('recipient', v)}
              placeholder="e.g. Ahmed Al-Fahad"
              className="mb-3"
            />
            <Input
              label={t('transfer.iban')}
              value={form.iban}
              onChangeText={(v) => setField('iban', v)}
              placeholder="AE00 0000 0000 0000 0000 000"
              autoCapitalize="characters"
              className="mb-3"
            />
            <Input
              label={t('transfer.amount')}
              value={form.amount}
              onChangeText={(v) => setField('amount', v)}
              placeholder="0.00"
              keyboardType="numeric"
              className="mb-3"
            />
            <Input
              label={t('transfer.note')}
              value={form.note}
              onChangeText={(v) => setField('note', v)}
              placeholder={t('transfer.note')}
              className="mb-4"
            />
            <Button
              label={t('transfer.send')}
              onPress={send}
              disabled={!form.recipient || !form.iban || !form.amount}
            />
          </Card>
        </View>

        {/* Recent Transfers */}
        {recentTransfers.length > 0 && (
          <View className="px-5 mt-6 mb-6">
            <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
              {t('transfer.recentTransfers')}
            </Typography>
            <Card>
              {recentTransfers.map((txn) => (
                <TransactionItem key={txn.id} transaction={txn} isRTL={isRTL} />
              ))}
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
