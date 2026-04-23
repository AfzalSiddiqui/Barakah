import { FluxTheme } from '@flux-ds/react-native-ds';

export const BarakahDarkTheme: FluxTheme = {
  primary: '#00D4AA',
  secondary: '#1C2333',
  accent: '#4F8CFF',
  background: '#0A0E17',
  surface: '#141922',
  textPrimary: '#F0F2F5',
  textSecondary: '#6B7B8D',
  success: '#00D4AA',
  warning: '#D4A843',
  error: '#FF4757',
  border: '#1C2333',
  divider: '#141922',
  onPrimary: '#0A0E17',
  onSecondary: '#F0F2F5',
  onError: '#FFFFFF',
  overlay: 'rgba(10,14,23,0.7)',
};

// Dark-only app — light theme uses same values
export const BarakahLightTheme: FluxTheme = { ...BarakahDarkTheme };
