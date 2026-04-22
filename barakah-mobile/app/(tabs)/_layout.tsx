import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

function TabIcon({ icon, label, focused }: { icon: string; label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 6, minWidth: 64 }}>
      <Text style={{ fontSize: 20, color: focused ? '#00D4AA' : '#6B7B8D' }}>
        {icon}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 11,
          fontWeight: focused ? '600' : '400',
          color: focused ? '#00D4AA' : '#6B7B8D',
          marginTop: 2,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#141922',
          borderTopColor: '#1C2333',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 24,
          paddingTop: 4,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#00D4AA',
        tabBarInactiveTintColor: '#6B7B8D',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" label={t('tabs.dashboard')} focused={focused} />
          ),
        }}
      />
<Tabs.Screen
        name="ai"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="💬" label={t('tabs.ai')} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📈" label={t('tabs.invest')} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="murabaha"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📊" label={t('tabs.murabaha')} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="zakat"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🕌" label={t('tabs.zakat')} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
