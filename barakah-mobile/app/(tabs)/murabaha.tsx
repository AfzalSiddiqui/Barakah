import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Slider from '@react-native-community/slider';
import { Typography } from '../../src/components/ui/Typography';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { IslamicProductCard } from '../../src/components/islamic/IslamicProductCard';
import { ShariaComplianceBadge } from '../../src/components/islamic/ShariaComplianceBadge';
import { useMurabahaStore } from '../../src/store/murabahaStore';
import { formatCurrency } from '../../src/lib/formatters';
import { useRTL } from '../../src/hooks/useRTL';

export default function MurabahaScreen() {
  const { t } = useTranslation();
  const { textAlign } = useRTL();
  const {
    products,
    selectedProduct,
    amount,
    tenure,
    calculation,
    complianceState,
    selectProduct,
    setAmount,
    setTenure,
    calculate,
  } = useMurabahaStore();

  useEffect(() => {
    calculate();
  }, []);

  if (!selectedProduct) return null;

  return (
    <SafeAreaView className="flex-1 bg-nb-dark" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Typography variant="h2" className={`text-nb-text ${textAlign}`}>
            {t('murabaha.title')}
          </Typography>
          <Typography variant="caption" className={`text-nb-muted mt-1 ${textAlign}`}>
            {t('murabaha.subtitle')}
          </Typography>
        </View>

        {/* Product Selection */}
        <View className="px-5 mt-4">
          <Typography variant="captionBold" className={`text-nb-muted mb-3 ${textAlign}`}>
            {t('murabaha.selectProduct')}
          </Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {products.map((product) => (
                <IslamicProductCard
                  key={product.id}
                  product={product}
                  selected={selectedProduct.type === product.type}
                  onSelect={() => selectProduct(product.type)}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Calculator */}
        <View className="px-5 mt-6">
          <Card>
            {/* Amount Slider */}
            <View className="mb-5">
              <View className="flex-row justify-between mb-2">
                <Typography variant="captionBold" className="text-nb-muted">
                  {t('murabaha.amount')}
                </Typography>
                <Typography variant="bodyBold" className="text-nb-green">
                  {formatCurrency(amount)}
                </Typography>
              </View>
              <Slider
                minimumValue={selectedProduct.minAmount}
                maximumValue={selectedProduct.maxAmount}
                value={amount}
                onValueChange={(v) => setAmount(Math.round(v / 1000) * 1000)}
                minimumTrackTintColor="#00D4AA"
                maximumTrackTintColor="#1C2333"
                thumbTintColor="#00D4AA"
                step={1000}
              />
              <View className="flex-row justify-between">
                <Typography variant="small" className="text-nb-muted">
                  {formatCurrency(selectedProduct.minAmount)}
                </Typography>
                <Typography variant="small" className="text-nb-muted">
                  {formatCurrency(selectedProduct.maxAmount)}
                </Typography>
              </View>
            </View>

            {/* Tenure Slider */}
            <View className="mb-5">
              <View className="flex-row justify-between mb-2">
                <Typography variant="captionBold" className="text-nb-muted">
                  {t('murabaha.tenure')}
                </Typography>
                <Typography variant="bodyBold" className="text-nb-accent">
                  {tenure} {t('murabaha.tenure').includes('أشهر') ? '' : 'months'}
                </Typography>
              </View>
              <Slider
                minimumValue={selectedProduct.minTenure}
                maximumValue={selectedProduct.maxTenure}
                value={tenure}
                onValueChange={(v) => setTenure(Math.round(v))}
                minimumTrackTintColor="#4F8CFF"
                maximumTrackTintColor="#1C2333"
                thumbTintColor="#4F8CFF"
                step={1}
              />
              <View className="flex-row justify-between">
                <Typography variant="small" className="text-nb-muted">
                  {selectedProduct.minTenure}m
                </Typography>
                <Typography variant="small" className="text-nb-muted">
                  {selectedProduct.maxTenure}m
                </Typography>
              </View>
            </View>

            {/* Profit Rate */}
            <View className="flex-row justify-between items-center mb-4 bg-nb-surface rounded-xl p-3">
              <Typography variant="caption" className="text-nb-muted">
                {t('murabaha.profitRate')}
              </Typography>
              <Badge label={`${(selectedProduct.profitRate * 100).toFixed(1)}% p.a.`} variant="info" />
            </View>

            <Button label={t('murabaha.calculate')} onPress={calculate} />
          </Card>
        </View>

        {/* Results */}
        {calculation && (
          <View className="px-5 mt-4">
            <Card variant="elevated">
              <View className="flex-row justify-between mb-3">
                <Typography variant="body" className="text-nb-muted">
                  {t('murabaha.monthlyPayment')}
                </Typography>
                <Typography variant="h3" className="text-nb-green">
                  {formatCurrency(calculation.monthlyPayment)}
                </Typography>
              </View>
              <View className="flex-row justify-between mb-2">
                <Typography variant="caption" className="text-nb-muted">
                  {t('murabaha.totalCost')}
                </Typography>
                <Typography variant="captionBold" className="text-nb-text">
                  {formatCurrency(calculation.totalCost)}
                </Typography>
              </View>
              <View className="flex-row justify-between mb-4">
                <Typography variant="caption" className="text-nb-muted">
                  {t('murabaha.totalProfit')}
                </Typography>
                <Typography variant="captionBold" className="text-nb-gold">
                  {formatCurrency(calculation.totalProfit)}
                </Typography>
              </View>
              <Button label={t('murabaha.applyNow')} variant="primary" size="lg" />
            </Card>
          </View>
        )}

        {/* Compliance Checks */}
        {complianceState && (
          <View className="px-5 mt-4 mb-6">
            <Card>
              <View className="flex-row justify-between items-center mb-3">
                <Typography variant="captionBold" className="text-nb-muted">
                  {t('murabaha.complianceChecks')}
                </Typography>
                <ShariaComplianceBadge status={complianceState.status} size="sm" />
              </View>
              {complianceState.checks.map((check) => (
                <View key={check.id} className="flex-row items-center py-2 border-b border-nb-surface">
                  <View
                    className={`w-4 h-4 rounded-full items-center justify-center mr-2.5 ${
                      check.status === 'compliant' ? 'bg-nb-green/20' : 'bg-nb-red/20'
                    }`}
                  >
                    <Typography
                      variant="small"
                      className={check.status === 'compliant' ? 'text-nb-green' : 'text-nb-red'}
                    >
                      {check.status === 'compliant' ? '✓' : '✗'}
                    </Typography>
                  </View>
                  <View className="flex-1">
                    <Typography variant="captionBold" className="text-nb-text">
                      {check.name}
                    </Typography>
                    <Typography variant="small" className="text-nb-muted">
                      {check.description}
                    </Typography>
                  </View>
                </View>
              ))}
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
