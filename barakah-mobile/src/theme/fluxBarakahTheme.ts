import { FluxTheme } from '@flux-ds/react-native-ds';

export const BarakahDarkTheme: FluxTheme = {
  primary: '#00D4AA',
  secondary: 'rgba(255, 255, 255, 0.06)',
  accent: '#4F8CFF',
  background: '#0A0E17',
  surface: 'rgba(255, 255, 255, 0.04)',
  textPrimary: '#F0F2F5',
  textSecondary: '#6B7B8D',
  success: '#00D4AA',
  warning: '#C9A84C',
  error: '#FF4757',
  border: 'rgba(255, 255, 255, 0.12)',
  divider: 'rgba(255, 255, 255, 0.08)',
  onPrimary: '#0A0E17',
  onSecondary: '#F0F2F5',
  onError: '#FFFFFF',
  overlay: 'rgba(10,14,23,0.8)',
};

// Dark-only app — light theme uses same values
export const BarakahLightTheme: FluxTheme = { ...BarakahDarkTheme };
