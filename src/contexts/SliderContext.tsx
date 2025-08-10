import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '@/api';

export interface Slider {
  _id: string;
  imageUrl: string;
  altText: string;
  order: number;
}

interface SliderContextType {
  sliders: Slider[];
  loading: boolean;
  error: string | null;
  updateSlider: (id: string, updates: Partial<Slider>) => void;
  deleteSlider: (id: string) => void;
}

export const SliderContext = createContext<SliderContextType>({
  sliders: [],
  loading: true,
  error: null,
  updateSlider: () => {},
  deleteSlider: () => {},
});

export const SliderProvider = ({ children }: { children: ReactNode }) => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await api.get('/sliders/');
        setSliders(response.data);
      } catch (err) {
        setError('Failed to fetch sliders');
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  const updateSlider = async (id: string, updates: Partial<Slider>) => {
    try {
      const response = await api.put(`/sliders/${id}`, updates);
      setSliders(prev =>
        prev.map(slider =>
          slider._id === id ? response.data : slider
        )
      );
    } catch (err) {
      setError('Failed to update slider');
    }
  };

  const deleteSlider = async (id: string) => {
    try {
      await api.delete(`/sliders/${id}`);
      setSliders(prev => prev.filter(slider => slider._id !== id));
    } catch (err) {
      setError('Failed to delete slider');
    }
  };

  return (
    <SliderContext.Provider value={{ sliders, loading, error, updateSlider, deleteSlider }}>
      {children}
    </SliderContext.Provider>
  );
};

export const useSliders = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error('useSliders must be used within a SliderProvider');
  }
  return context;
};
