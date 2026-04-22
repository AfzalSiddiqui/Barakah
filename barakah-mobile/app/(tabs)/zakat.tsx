import React, { useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../src/components/ui/Typography';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { ZakatProgressRing } from '../../src/components/islamic/ZakatProgressRing';
import { NisabThresholdBar } from '../../src/components/islamic/NisabThresholdBar';
import { HalalStatusIndicator } from '../../src/components/islamic/HalalStatusIndicator';
import { useZakatStore } from '../../src/store/zakatStore';
import { getNisabThreshold } from '../../src/engines/zakatCalculator';
import { useRTL } from '../../src/hooks/useRTL';
import type { Madhab } from '../../src/engines/types';

function AssetInput({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: number;
  onChangeText: (v: number) => void;
}) {
  return (
    <View className="flex-row items-center justify-between py-1.5">
      <Typography variant="caption" className="text-nb-muted flex-1">
        {label}
      </Typography>
      <View className="w-32">
        <Input
          value={value > 0 ? value.toString() : ''}
          onChangeText={(t) => onChangeText(Number(t) || 0)}
          keyboardType="numeric"
          placeholder="0"
        />
      </View>
    </View>
  );
}

export default function ZakatScreen() {
  const { t } = useTranslation();
  const { textAlign } = useRTL();
  const {
    assets,
    liabilities,
    madhab,
    result,
    portfolio,
    setAsset,
    setLiability,
    setMadhab,
    calculate,
  } = useZakatStore();

  useEffect(() => {
    calculate();
  }, []);

  const nisab = getNisabThreshold(madhab);
  const netWealth = result?.netZakatable ?? 0;
  const zakatDue = result?.zakatDue ?? 0;

  return (
    <SafeAreaView className="flex-1 bg-nb-dark" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Typography variant="h2" className={`text-nb-text ${textAlign}`}>
            {t('zakat.title')}
          </Typography>
          <Typography variant="caption" className={`text-nb-gold mt-1 ${textAlign}`}>
            {t('zakat.subtitle')}
          </Typography>
        </View>

        {/* Progress Ring */}
        {result && (
          <View className="px-5 mt-4">
            <ZakatProgressRing
              zakatDue={zakatDue}
              netWealth={netWealth}
              nisabThreshold={nisab}
            />
          </View>
        )}

        {/* Madhab Selector */}
        <View className="px-5 mt-6">
          <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
            {t('zakat.madhab')}
          </Typography>
          <View className="flex-row gap-3">
            {(['hanafi', 'shafii'] as Madhab[]).map((m) => (
              <TouchableOpacity
                key={m}
                onPress={() => setMadhab(m)}
                activeOpacity={0.7}
                className={`flex-1 py-2.5 rounded-xl items-center border-2 ${
                  madhab === m
                    ? 'border-nb-gold bg-nb-gold/10'
                    : 'border-nb-card bg-nb-surface'
                }`}
              >
                <Typography
                  variant="captionBold"
                  className={madhab === m ? 'text-nb-gold' : 'text-nb-muted'}
                >
                  {m === 'hanafi' ? t('zakat.hanafi') : t('zakat.shafii')}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nisab Bar */}
        <View className="px-5 mt-6">
          <NisabThresholdBar
            netWealth={netWealth}
            nisabThreshold={nisab}
          />
        </View>

        {/* Assets */}
        <View className="px-5 mt-6">
          <Card>
            <Typography variant="captionBold" className="text-nb-muted mb-2">
              {t('zakat.assets')} (AED)
            </Typography>
            <AssetInput
              label={t('zakat.cash')}
              value={assets.cash}
              onChangeText={(v) => setAsset('cash', v)}
            />
            <AssetInput
              label={t('zakat.gold')}
              value={assets.gold}
              onChangeText={(v) => setAsset('gold', v)}
            />
            <AssetInput
              label={t('zakat.investments')}
              value={assets.investments}
              onChangeText={(v) => setAsset('investments', v)}
            />
            <AssetInput
              label={t('zakat.business')}
              value={assets.businessAssets}
              onChangeText={(v) => setAsset('businessAssets', v)}
            />
            <AssetInput
              label={t('zakat.receivables')}
              value={assets.receivables}
              onChangeText={(v) => setAsset('receivables', v)}
            />
          </Card>
        </View>

        {/* Liabilities */}
        <View className="px-5 mt-4">
          <Card>
            <Typography variant="captionBold" className="text-nb-muted mb-2">
              {t('zakat.liabilities')} (AED)
            </Typography>
            <AssetInput
              label={t('zakat.debts')}
              value={liabilities.debts}
              onChangeText={(v) => setLiability('debts', v)}
            />
          </Card>
        </View>

        {/* Calculate Button */}
        <View className="px-5 mt-4">
          <Button
            label={`${t('zakat.title')}`}
            onPress={calculate}
            size="lg"
          />
        </View>

        {/* Result */}
        {result && (
          <View className="px-5 mt-4">
            <Card variant="elevated">
              <View className="flex-row justify-between mb-2">
                <Typography variant="caption" className="text-nb-muted">
                  {t('zakat.netZakatable')}
                </Typography>
                <Typography variant="bodyBold" className="text-nb-text">
                  AED {result.netZakatable.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Typography>
              </View>
              <View className="flex-row justify-between mb-2">
                <Typography variant="caption" className="text-nb-muted">
                  {t('zakat.zakatRate')}
                </Typography>
                <Typography variant="captionBold" className="text-nb-gold">
                  2.5%
                </Typography>
              </View>
              <View className="h-px bg-nb-surface my-2" />
              <View className="flex-row justify-between">
                <Typography variant="bodyBold" className="text-nb-gold">
                  {t('zakat.zakatDue')}
                </Typography>
                <Typography variant="h3" className="text-nb-gold">
                  AED {result.zakatDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Typography>
              </View>
            </Card>
          </View>
        )}

        {/* Halal Screening */}
        <View className="px-5 mt-6 mb-6">
          <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
            {t('zakat.halalScreening')}
          </Typography>
          <View className="gap-3">
            {portfolio.map((item) => (
              <HalalStatusIndicator
                key={item.id}
                name={item.name}
                ticker={item.ticker}
                status={item.status}
                failedChecks={item.failedChecks}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
