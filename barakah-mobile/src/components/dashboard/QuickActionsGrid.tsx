import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useFluxColors } from '@flux-ds/react-native-ds';
import { FluxText } from '@flux-ds/react-native-foundation';

interface QuickAction {
  icon: string;
  label: string;
  onPress: () => void;
}

interface QuickActionsGridProps {
  actions: QuickAction[];
  className?: string;
}

export function QuickActionsGrid({ actions, className }: QuickActionsGridProps) {
  const colors = useFluxColors();

  return (
    <View className={`flex-row justify-between ${className ?? ''}`}>
      {actions.map((action, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={action.onPress}
          activeOpacity={0.7}
          className="items-center flex-1"
        >
          <View className="w-14 h-14 rounded-2xl bg-nb-card items-center justify-center mb-2">
            <FluxText textStyle="headline">{action.icon}</FluxText>
          </View>
          <FluxText textStyle="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
            {action.label}
          </FluxText>
        </TouchableOpacity>
      ))}
    </View>
  );
}
