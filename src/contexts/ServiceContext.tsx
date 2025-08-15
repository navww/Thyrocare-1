import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  getServices as fetchServices,
  addServiceAPI,
  updateServiceAPI,
  deleteServiceAPI 
} from '../api';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  rating: number;
  patients: number;
  isPopular?: boolean;
  category: string;
  imageAlt: string;
  image?: string;
  detailedDescription?: string;
  additionalImages?: string[];
  features?: string[];
  requirements?: string[];
}

// Type for the service object coming from the API
interface ApiService extends Omit<Service, 'id'> {
  _id: string;
}

interface ServiceContextType {
  services: Service[];
  getService: (id: string) => Service | undefined;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetchServices();
        const serviceList = response.data.services || response.data.data || response.data;
        console.log('Fetched services data:', serviceList); // Log fetched data

        if (Array.isArray(serviceList)) {
          const servicesWithId = serviceList.map((service: ApiService) => ({
            ...service,
            id: service._id,
            features: service.features || [],
            requirements: service.requirements || [],
            additionalImages: service.additionalImages || [],
          }));
          setServices(servicesWithId);
        } else {
          console.error("Fetched services data is not an array:", response.data);
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching services", error);
        setServices([]);
      }
    };
    loadServices();
  }, []);

  const getService = (id: string) => {
    return services.find(service => service.id === id);
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      const response = await addServiceAPI(service);
      const serviceList = response.data.services;
      console.log('Data returned after adding service:', serviceList); // Log data after adding

      if (Array.isArray(serviceList)) {
        const servicesWithId = serviceList.map((s: ApiService) => ({
          ...s,
          id: s._id,
          features: s.features || [],
          requirements: s.requirements || [],
          additionalImages: s.additionalImages || [],
        }));
        setServices(servicesWithId);
      } else {
        console.error("Invalid data returned after adding service:", response.data);
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const updateService = async (id: string, updatedService: Partial<Service>) => {
    try {
      await updateServiceAPI(id, updatedService);
      // Re-fetch all services to ensure data consistency after update
      const response = await fetchServices();
      const serviceList = response.data.services || response.data.data || response.data;
      console.log('Data returned after updating service (re-fetch):', serviceList); // Log data after updating

      if (Array.isArray(serviceList)) {
        const servicesWithId = serviceList.map((service: ApiService) => ({
          ...service,
          id: service._id,
          features: service.features || [],
          requirements: service.requirements || [],
          additionalImages: service.additionalImages || [],
        }));
        setServices(servicesWithId);
      } else {
        console.error("Fetched services data is not an array after update:", response.data);
        setServices([]);
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await deleteServiceAPI(id);
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <ServiceContext.Provider value={{
      services,
      getService,
      addService,
      updateService,
      deleteService,
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};
