import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface GlobalSettings {
  currency: {
    code: string;
    symbol: string;
    name: string;
  };
  language: {
    code: string;
    name: string;
  };
}

interface GlobalSettingsContextType {
  settings: GlobalSettings;
  updateSettings: (settings: Partial<GlobalSettings>) => void;
  currencies: Array<{ code: string; symbol: string; name: string; }>;
  languages: Array<{ code: string; name: string; }>;
}

const GlobalSettingsContext = createContext<GlobalSettingsContextType | undefined>(undefined);

const availableCurrencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文 (Chinese)' },
  { code: 'ja', name: '日本語 (Japanese)' },
  { code: 'ar', name: 'العربية (Arabic)' },
];

const initialSettings: GlobalSettings = {
  currency: availableCurrencies[0], // USD
  language: availableLanguages[0], // English
};

export const GlobalSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<GlobalSettings>(initialSettings);

  const updateSettings = (newSettings: Partial<GlobalSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <GlobalSettingsContext.Provider value={{
      settings,
      updateSettings,
      currencies: availableCurrencies,
      languages: availableLanguages
    }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export const useGlobalSettings = () => {
  const context = useContext(GlobalSettingsContext);
  if (!context) {
    throw new Error('useGlobalSettings must be used within a GlobalSettingsProvider');
  }
  return context;
};