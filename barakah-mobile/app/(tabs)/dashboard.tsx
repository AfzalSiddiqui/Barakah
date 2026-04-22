import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../src/components/ui/Typography';
import { Card } from '../../src/components/ui/Card';
import { BalanceCard } from '../../src/components/dashboard/BalanceCard';
import { TransactionItem } from '../../src/components/dashboard/TransactionItem';
import { QuickActionsGrid } from '../../src/components/dashboard/QuickActionsGrid';
import { ProfitShareWidget } from '../../src/components/islamic/ProfitShareWidget';
import { useAppStore } from '../../src/store/appStore';
import { useRTL } from '../../src/hooks/useRTL';

export default function DashboardScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, transactions } = useAppStore();
  const { toggleLanguage, language, isRTL, textAlign } = useRTL();

  const quickActions = [
    { icon: '↗️', label: t('dashboard.transfer'), onPress: () => router.push('/transfer') },
    { icon: '📱', label: t('dashboard.pay'), onPress: () => router.push('/pay') },
    { icon: '📈', label: t('dashboard.invest'), onPress: () => router.push('/invest') },
    { icon: '🌐', label: language === 'en' ? 'عربي' : 'EN', onPress: toggleLanguage },
  ];

  return (
    <SafeAreaView className="flex-1 bg-nb-dark" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Typography variant="caption" className={`text-nb-muted ${textAlign}`}>
            {t('dashboard.greeting')}
          </Typography>
          <Typography variant="h2" className={`text-nb-text ${textAlign}`}>
            {isRTL ? user.nameAr : user.name}
          </Typography>
        </View>

        {/* Balance Card */}
        <View className="px-5 mt-2">
          <BalanceCard
            balance={user.balance}
            accountNumber={user.accountNumber}
            currency={user.currency}
            shariaStatus={user.shariaStatus}
          />
        </View>

        {/* Quick Actions */}
        <View className="px-5 mt-6">
          <Typography variant="captionBold" className={`text-nb-muted mb-4 ${textAlign}`}>
            {t('dashboard.quickActions')}
          </Typography>
          <QuickActionsGrid actions={quickActions} />
        </View>

        {/* Profit Share */}
        <View className="px-5 mt-6">
          <ProfitShareWidget
            amount={1875.25}
            period={isRTL ? 'الربع الأول 2026' : 'Q1 2026'}
            annualizedReturn={0.062}
          />
        </View>

        {/* Recent Transactions */}
        <View className="px-5 mt-6 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Typography variant="captionBold" className="text-nb-muted">
              {t('dashboard.recentTransactions')}
            </Typography>
            <Typography variant="small" className="text-nb-green">
              {t('common.viewAll')}
            </Typography>
          </View>
          <Card>
            {transactions.slice(0, 5).map((txn) => (
              <TransactionItem key={txn.id} transaction={txn} isRTL={isRTL} />
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
