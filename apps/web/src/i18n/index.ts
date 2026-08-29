import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLanding from './locales/en.json';
import ptLanding from './locales/pt.json';
import zhLanding from './locales/zh.json';
import arLanding from './locales/ar.json';

const resources = {
  en: { landing: enLanding },
  pt: { landing: ptLanding },
  zh: { landing: zhLanding },
  ar: { landing: arLanding },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'landing',
    lng: 'en', // default language is English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
