import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../ui/Typography';

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
            <Typography variant="h3">{action.icon}</Typography>
          </View>
          <Typography variant="small" className="text-nb-muted">
            {action.label}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
}
