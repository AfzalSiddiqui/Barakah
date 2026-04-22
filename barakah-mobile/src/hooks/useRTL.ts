import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import { useCallback } from 'react';
import { useSettingsStore } from '../store/settingsStore';

export function useRTL() {
  const { i18n } = useTranslation();
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const isRTL = i18n.language === 'ar';

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
    I18nManager.allowRTL(newLang === 'ar');
    I18nManager.forceRTL(newLang === 'ar');
  }, [i18n, setLanguage]);

  return {
    isRTL,
    language: i18n.language as 'en' | 'ar',
    toggleLanguage,
    direction: isRTL ? 'rtl' as const : 'ltr' as const,
    flexRow: isRTL ? 'flex-row-reverse' as const : 'flex-row' as const,
    textAlign: isRTL ? 'text-right' as const : 'text-left' as const,
    ml: isRTL ? 'mr' as const : 'ml' as const,
    mr: isRTL ? 'ml' as const : 'mr' as const,
  };
}
