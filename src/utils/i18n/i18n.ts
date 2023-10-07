import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import resources from '../../locales';

const DEFAULT_LOCALE = 'en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    returnNull: false,
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: DEFAULT_LOCALE,
  });

export default i18n;
