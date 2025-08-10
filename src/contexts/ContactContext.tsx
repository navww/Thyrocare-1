import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '@/api';

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  businessHours: string;
}

interface ContactContextType {
  contactInfo: ContactInfo;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

const initialContactInfo: ContactInfo = {
  phone: "0120-123-456",
  email: "info@medical-consult.com",
  address: "123 Medical Center Dr, Healthcare City, HC 12345",
  businessHours: "Mon-Fri 9:00-18:00"
};

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await api.get('/business-contact');
        if (response.data) {
          setContactInfo(response.data);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  const updateContactInfo = async (info: Partial<ContactInfo>) => {
    try {
      const response = await api.put('/business-contact', info);
      setContactInfo(response.data);
    } catch (error) {
      console.error('Error updating contact info:', error);
    }
  };

  return (
    <ContactContext.Provider value={{
      contactInfo,
      updateContactInfo
    }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContactInfo = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactInfo must be used within a ContactProvider');
  }
  return context;
};
