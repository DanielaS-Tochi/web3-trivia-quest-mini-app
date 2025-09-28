import { useState, useEffect } from 'react';
import { Language } from '@/types';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Set initial language based on browser preference
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
    setLanguage(browserLang);
  }, []);

  return { language, setLanguage };
}