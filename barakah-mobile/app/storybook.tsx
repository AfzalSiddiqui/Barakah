import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFluxColors, hexToRgba } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';
import { GradientBackground } from '../src/components/ui/GradientBackground';
import { Card } from '../src/components/ui/Card';
import { Button } from '../src/components/ui/Button';
import { Input } from '../src/components/ui/Input';
import { Badge } from '../src/components/ui/Badge';
import { BalanceCard } from '../src/components/dashboard/BalanceCard';
import { QuickActionsGrid } from '../src/components/dashboard/QuickActionsGrid';
import { TransactionItem } from '../src/components/dashboard/TransactionItem';
import { ChatBubble } from '../src/components/chat/ChatBubble';
import { ChatInput } from '../src/components/chat/ChatInput';
import { ShariaComplianceBadge } from '../src/components/islamic/ShariaComplianceBadge';
import { IslamicProductCard } from '../src/components/islamic/IslamicProductCard';
import { NisabThresholdBar } from '../src/components/islamic/NisabThresholdBar';
import { ZakatProgressRing } from '../src/components/islamic/ZakatProgressRing';
import { ProfitShareWidget } from '../src/components/islamic/ProfitShareWidget';
import { HalalStatusIndicator } from '../src/components/islamic/HalalStatusIndicator';
import { colors as themeColors } from '../src/theme/colors';
import type { Transaction, ChatMessage, MurabahaProduct } from '../src/engines/types';

// ─── Section wrapper ───────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const colors = useFluxColors();
  return (
    <View style={{ marginBottom: 32 }}>
      <FluxText
        textStyle="caption"
        color={colors.primary}
        style={{ fontWeight: '700', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}
      >
        {title}
      </FluxText>
      {children}
    </View>
  );
}

// ─── Mock data ─────────────────────────────────────────────────────
const mockTransaction: Transaction = {
  id: 'tx1',
  type: 'debit',
  amount: 249.99,
  currency: 'AED',
  description: 'Carrefour Hypermarket',
  descriptionAr: 'كارفور هايبرماركت',
  category: 'payment',
  date: '2026-05-28',
  isCompliant: true,
};

const mockCreditTx: Transaction = {
  id: 'tx2',
  type: 'credit',
  amount: 5000.0,
  currency: 'AED',
  description: 'Monthly Salary',
  descriptionAr: 'الراتب الشهري',
  category: 'salary',
  date: '2026-05-25',
  isCompliant: true,
};

const mockMessages: ChatMessage[] = [
  { id: '1', role: 'user', content: 'What is my Zakat obligation this year?', timestamp: Date.now() },
  {
    id: '2',
    role: 'assistant',
    content: 'Based on your net wealth of AED 185,000 (above Nisab of AED 23,976), your estimated Zakat due is AED 4,625.',
    timestamp: Date.now(),
    actions: [
      { id: 'a1', label: 'Pay Zakat Now', type: 'navigate', payload: 'pay_zakat' },
      { id: 'a2', label: 'View Breakdown', type: 'info', payload: 'breakdown' },
    ],
  },
];

const mockProduct: MurabahaProduct = {
  id: 'p1',
  type: 'home',
  name: 'Home Finance',
  icon: '🏠',
  profitRate: 0.039,
  minAmount: 100000,
  maxAmount: 5000000,
  minTenure: 12,
  maxTenure: 300,
};

const quickActions = [
  { icon: '💸', label: 'Transfer', onPress: () => {} },
  { icon: '📱', label: 'Pay', onPress: () => {} },
  { icon: '📈', label: 'Invest', onPress: () => {} },
  { icon: '🕌', label: 'Zakat', onPress: () => {} },
];

// ─── Main Storybook Screen ────────────────────────────────────────
export default function StorybookScreen() {
  const colors = useFluxColors();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 8,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: themeColors.glass.border,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <FluxText textStyle="body" color={colors.primary} style={{ fontWeight: '600' }}>
              ← Back
            </FluxText>
          </TouchableOpacity>
          <FluxText textStyle="headline" color={colors.textPrimary} style={{ fontWeight: '700' }}>
            Glass UI Kit
          </FluxText>
          <View style={{ width: 50 }} />
        </View>

        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Cards ── */}
          <Section title="Cards">
            <Card style={{ marginBottom: 12 }}>
              <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontWeight: '600' }}>
                Glass Card (Default)
              </FluxText>
              <FluxText textStyle="body" color={colors.textPrimary} style={{ marginTop: 4 }}>
                Semi-transparent background with blur and luminous border.
              </FluxText>
            </Card>
            <Card variant="elevated" style={{ marginBottom: 12 }}>
              <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontWeight: '600' }}>
                Glass Card (Elevated)
              </FluxText>
              <FluxText textStyle="body" color={colors.textPrimary} style={{ marginTop: 4 }}>
                Same glass effect with added shadow elevation.
              </FluxText>
            </Card>
          </Section>

          {/* ── Balance Card ── */}
          <Section title="Balance Card">
            <BalanceCard
              balance={185420.75}
              accountNumber="****4821"
              currency="AED"
              shariaStatus="compliant"
            />
          </Section>

          {/* ── Quick Actions ── */}
          <Section title="Quick Actions">
            <QuickActionsGrid actions={quickActions} />
          </Section>

          {/* ── Buttons ── */}
          <Section title="Buttons">
            <View style={{ gap: 10 }}>
              <Button label="Primary Button" variant="primary" />
              <Button label="Secondary (Glass)" variant="secondary" />
              <Button label="Outline" variant="outline" />
              <Button label="Ghost" variant="ghost" />
              <Button label="Loading..." variant="primary" loading />
              <Button label="Disabled" variant="secondary" disabled />
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Button label="Small" variant="primary" size="sm" />
                <Button label="Medium" variant="secondary" size="md" />
                <Button label="Large" variant="outline" size="lg" />
              </View>
            </View>
          </Section>

          {/* ── Inputs ── */}
          <Section title="Inputs">
            <Input
              label="Amount (AED)"
              placeholder="Enter amount..."
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
              className="mb-3"
            />
            <Input
              label="With Error"
              placeholder="Invalid input"
              error="This field is required"
              value=""
              className="mb-3"
            />
          </Section>

          {/* ── Badges ── */}
          <Section title="Badges">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              <Badge label="Success" variant="success" />
              <Badge label="Warning" variant="warning" />
              <Badge label="Error" variant="error" />
              <Badge label="Info" variant="info" />
              <Badge label="Neutral" variant="neutral" />
            </View>
          </Section>

          {/* ── Sharia Compliance Badges ── */}
          <Section title="Sharia Badges">
            <View style={{ gap: 8 }}>
              <ShariaComplianceBadge status="compliant" />
              <ShariaComplianceBadge status="non_compliant" />
              <ShariaComplianceBadge status="review_required" />
              <ShariaComplianceBadge status="pending" />
            </View>
          </Section>

          {/* ── Transactions ── */}
          <Section title="Transactions">
            <Card>
              <TransactionItem transaction={mockCreditTx} />
              <TransactionItem transaction={mockTransaction} />
            </Card>
          </Section>

          {/* ── Chat ── */}
          <Section title="Chat Bubbles">
            <View style={{ marginBottom: 12 }}>
              {mockMessages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} onActionPress={() => {}} />
              ))}
            </View>
            <ChatInput onSend={() => {}} placeholder="Try typing here..." />
          </Section>

          {/* ── Islamic Product Card ── */}
          <Section title="Islamic Product Cards">
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <IslamicProductCard
                  product={mockProduct}
                  selected={selectedProduct}
                  onSelect={() => setSelectedProduct(!selectedProduct)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <IslamicProductCard
                  product={{ ...mockProduct, id: 'p2', type: 'auto', name: 'Auto Finance', icon: '🚗', profitRate: 0.045 }}
                  selected={false}
                  onSelect={() => {}}
                />
              </View>
            </View>
          </Section>

          {/* ── Halal Screening ── */}
          <Section title="Halal Status">
            <HalalStatusIndicator
              name="Emirates NBD"
              ticker="ENBD"
              status="halal"
              failedChecks={[]}
              className="mb-2"
            />
            <HalalStatusIndicator
              name="DP World"
              ticker="DPW"
              status="doubtful"
              failedChecks={['Debt-to-equity ratio exceeds 33%']}
            />
          </Section>

          {/* ── Profit Share ── */}
          <Section title="Profit Share Widget">
            <ProfitShareWidget
              amount={1250.5}
              period="Q1 2026"
              annualizedReturn={0.052}
            />
          </Section>

          {/* ── Zakat Progress ── */}
          <Section title="Zakat Progress">
            <Card>
              <ZakatProgressRing
                zakatDue={4625}
                netWealth={185000}
                nisabThreshold={23976}
                size={140}
              />
            </Card>
          </Section>

          {/* ── Nisab Threshold ── */}
          <Section title="Nisab Threshold">
            <Card>
              <NisabThresholdBar
                netWealth={185000}
                nisabThreshold={23976}
              />
            </Card>
          </Section>

          {/* ── Color Palette ── */}
          <Section title="Glass Color Palette">
            <Card>
              <View style={{ gap: 8 }}>
                {[
                  { label: 'glass.bg', color: themeColors.glass.bg },
                  { label: 'glass.bgLight', color: themeColors.glass.bgLight },
                  { label: 'glass.border', color: themeColors.glass.border },
                  { label: 'glass.borderLight', color: themeColors.glass.borderLight },
                  { label: 'glass.highlight', color: themeColors.glass.highlight },
                ].map((item) => (
                  <View key={item.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View
                      style={{
                        width: 40,
                        height: 28,
                        borderRadius: 6,
                        backgroundColor: item.color,
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.2)',
                      }}
                    />
                    <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 11 }}>
                      {item.label}
                    </FluxText>
                  </View>
                ))}
              </View>
            </Card>
          </Section>

          {/* ── Accent Colors ── */}
          <Section title="Accent Colors">
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[
                { label: 'Green', color: '#00D4AA' },
                { label: 'Accent', color: '#4F8CFF' },
                { label: 'Gold', color: themeColors.nb.gold },
                { label: 'Red', color: '#FF4757' },
              ].map((item) => (
                <View key={item.label} style={{ flex: 1, alignItems: 'center' }}>
                  <View
                    style={{
                      width: '100%',
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: item.color,
                      marginBottom: 4,
                    }}
                  />
                  <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
                    {item.label}
                  </FluxText>
                </View>
              ))}
            </View>
          </Section>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}
