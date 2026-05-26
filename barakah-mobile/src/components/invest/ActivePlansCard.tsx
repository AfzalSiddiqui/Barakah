import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useFluxColors, FluxSpacing, FluxRadius, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { useTranslation } from 'react-i18next';
import { useInvestStore } from '../../store/investStore';
import { useRTL } from '../../hooks/useRTL';
import { Badge } from '../ui/Badge';
import type { MetalInvestmentPlan, MetalInvestFrequency } from '../../engines/types';

function PlanRow({ plan }: { plan: MetalInvestmentPlan }) {
  const { t } = useTranslation();
  const colors = useFluxColors();
  const { flexRow } = useRTL();
  const cancelPlan = useInvestStore((s) => s.cancelPlan);

  const icon = plan.metalType === 'gold' ? '🥇' : '🥈';
  const metalColor = plan.metalType === 'gold' ? '#C9A84C' : '#C0C0C0';

  const freqLabels: Record<MetalInvestFrequency, string> = {
    daily: t('invest.freqDaily'),
    monthly: t('invest.freqMonthly'),
    one_time: t('invest.freqOneTime'),
  };

  return (
    <View
      className="p-3 rounded-xl mb-2"
      style={{
        backgroundColor: colors.surface,
        borderRadius: FluxRadius.lg,
      }}
    >
      <View className={`${flexRow} justify-between items-center`}>
        <View className={`${flexRow} items-center gap-2 flex-1`}>
          <FluxText textStyle="body" style={{ fontSize: 20 }}>{icon}</FluxText>
          <View>
            <View className={`${flexRow} items-center gap-2`}>
              <FluxText
                textStyle="body"
                color={colors.textPrimary}
                style={{ fontWeight: '600', fontSize: 13 }}
              >
                {`${plan.amountPerInterval} ${plan.currency}`}
              </FluxText>
              <Badge
                label={freqLabels[plan.frequency]}
                variant={plan.frequency === 'daily' ? 'info' : 'warning'}
              />
            </View>
            <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10, marginTop: 2 }}>
              {`${t('invest.accumulated')}: ${plan.gramsAccumulated.toFixed(2)}g`}
            </FluxText>
          </View>
        </View>
        <View className="items-end">
          <FluxText
            textStyle="body"
            color={metalColor}
            style={{ fontWeight: '600', fontSize: 13 }}
          >
            {`${plan.totalInvested.toLocaleString()} ${plan.currency}`}
          </FluxText>
          {plan.isActive && plan.nextDate && (
            <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 9 }}>
              {`${t('invest.next')}: ${plan.nextDate}`}
            </FluxText>
          )}
        </View>
      </View>
      {plan.isActive && (
        <View className={`${flexRow} justify-between items-center mt-2`}>
          <Badge label={t('invest.active')} variant="success" />
          <TouchableOpacity
            onPress={() => cancelPlan(plan.id)}
            style={{
              paddingHorizontal: FluxSpacing.sm,
              paddingVertical: FluxSpacing.xxs,
              borderRadius: FluxRadius.full,
              backgroundColor: hexToRgba(colors.error, 0.15),
            }}
          >
            <FluxText
              textStyle="caption"
              color={colors.error}
              style={{ fontWeight: '600', fontSize: 10 }}
            >
              {t('invest.cancelPlan')}
            </FluxText>
          </TouchableOpacity>
        </View>
      )}
      {!plan.isActive && (
        <View className="mt-2">
          <Badge label={plan.frequency === 'one_time' ? t('invest.completed') : t('invest.cancelled')} variant="neutral" />
        </View>
      )}
    </View>
  );
}

export function ActivePlansCard() {
  const { t } = useTranslation();
  const colors = useFluxColors();
  const { textAlign } = useRTL();
  const metalPlans = useInvestStore((s) => s.metalPlans);

  if (metalPlans.length === 0) return null;

  const activePlans = metalPlans.filter((p) => p.isActive);
  const completedPlans = metalPlans.filter((p) => !p.isActive);

  return (
    <View>
      {activePlans.length > 0 && (
        <>
          {activePlans.map((plan) => (
            <PlanRow key={plan.id} plan={plan} />
          ))}
        </>
      )}
      {completedPlans.length > 0 && (
        <>
          {completedPlans.map((plan) => (
            <PlanRow key={plan.id} plan={plan} />
          ))}
        </>
      )}
    </View>
  );
}
