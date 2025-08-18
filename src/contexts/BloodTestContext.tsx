import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import api from '@/api';

export interface BloodTest {
  _id: string;
  name: string;
  price: string;
  originalPrice: string;
  description: string;
  sampleType: string;
  fasting: string;
  reportTime: string;
  category: string;
}

interface BloodTestContextType {
  bloodTests: BloodTest[];
  loading: boolean;
  error: string | null;
  addBloodTest: (data: Omit<BloodTest, '_id'>) => Promise<void>;
  updateBloodTest: (id: string, data: Partial<BloodTest>) => Promise<void>;
  deleteBloodTest: (id: string) => Promise<void>;
}

export const BloodTestContext = createContext<BloodTestContextType | undefined>(undefined);

export const useBloodTests = () => {
  const context = useContext(BloodTestContext);
  if (!context) {
    throw new Error('useBloodTests must be used within a BloodTestProvider');
  }
  return context;
};

export const BloodTestProvider = ({ children }: { children: ReactNode }) => {
  const [bloodTests, setBloodTests] = useState<BloodTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBloodTests = async () => {
      try {
        const response = await api.get('/blood-tests');
        setBloodTests(response.data);
      } catch (err) {
        setError('Failed to fetch blood tests');
      } finally {
        setLoading(false);
      }
    };

    fetchBloodTests();
  }, []);

  const updateBloodTest = async (id: string, data: Partial<BloodTest>) => {
    try {
      const response = await api.put(`/blood-tests/${id}`, data);
      setBloodTests(bloodTests.map(test => test._id === id ? response.data : test));
    } catch (err) {
      setError('Failed to update blood test');
    }
  };

  const deleteBloodTest = async (id: string) => {
    try {
      await api.delete(`/blood-tests/${id}`);
      setBloodTests(bloodTests.filter(test => test._id !== id));
    } catch (err) {
      setError('Failed to delete blood test');
    }
  };

  const addBloodTest = async (data: Omit<BloodTest, '_id'>) => {
    try {
      const response = await api.post('/blood-tests', data);
      setBloodTests([...bloodTests, response.data]);
    } catch (err) {
      setError('Failed to add blood test');
    }
  };

  return (
    <BloodTestContext.Provider value={{ bloodTests, loading, error, addBloodTest, updateBloodTest, deleteBloodTest }}>
      {children}
    </BloodTestContext.Provider>
  );
};
