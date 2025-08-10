import { createContext, useState, useEffect, ReactNode } from 'react';
import api from '@/api';

interface BloodTest {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
}

interface BloodTestContextType {
  bloodTests: BloodTest[];
  loading: boolean;
  error: string | null;
  updateBloodTest: (id: string, data: Partial<BloodTest>) => Promise<void>;
  deleteBloodTest: (id: string) => Promise<void>;
}

export const BloodTestContext = createContext<BloodTestContextType>({
  bloodTests: [],
  loading: true,
  error: null,
  updateBloodTest: async () => {},
  deleteBloodTest: async () => {},
});

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

  return (
    <BloodTestContext.Provider value={{ bloodTests, loading, error, updateBloodTest, deleteBloodTest }}>
      {children}
    </BloodTestContext.Provider>
  );
};
