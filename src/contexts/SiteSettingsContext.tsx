import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/api';

export interface SiteSettings {
  websiteName: string;
  logoUrl: string;
  bannerUrl: string;
  favicon: string;
}

interface SiteSettingsContextType {
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    websiteName: "Thyrocare",
    logoUrl: "/placeholder.svg",
    bannerUrl: "",
    favicon: ""
  });

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await api.get('/site-settings');
        if (response.data) {
          setSiteSettings(response.data);
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    };

    fetchSiteSettings();
  }, []);

  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    const newSettings = { ...siteSettings, ...settings };
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No auth token found');
        return;
      }
      await api.put('/settings', newSettings);
      setSiteSettings(newSettings);
    } catch (error) {
      console.error('Error updating site settings:', error);
    }
  };

  return (
    <SiteSettingsContext.Provider value={{
      siteSettings,
      updateSiteSettings
    }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
