import { create } from 'zustand';

interface SettingsState {
  language: 'en' | 'ar';
  biometricEnabled: boolean;
  notificationsEnabled: boolean;
  setLanguage: (lang: 'en' | 'ar') => void;
  toggleBiometric: () => void;
  toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'en',
  biometricEnabled: false,
  notificationsEnabled: true,
  setLanguage: (language) => set({ language }),
  toggleBiometric: () => set((s) => ({ biometricEnabled: !s.biometricEnabled })),
  toggleNotifications: () => set((s) => ({ notificationsEnabled: !s.notificationsEnabled })),
}));
