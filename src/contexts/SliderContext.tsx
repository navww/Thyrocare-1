import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api, { getSlidersAPI, addSliderAPI, updateSliderAPI, deleteSliderAPI } from '@/api';

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
  addSlider: (slider: Omit<Slider, '_id'>) => void; // Add addSlider to context type
  updateSlider: (id: string, updates: Partial<Slider>) => void;
  deleteSlider: (id: string) => void;
}

export const SliderContext = createContext<SliderContextType>({
  sliders: [],
  loading: true,
  error: null,
  addSlider: () => {}, // Add addSlider to default value
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
        const response = await getSlidersAPI(); // Use getSlidersAPI
        setSliders(response.data);
      } catch (err) {
        setError('Failed to fetch sliders');
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  const addSlider = async (slider: Omit<Slider, '_id'>) => {
    try {
      const response = await addSliderAPI(slider);
      setSliders(prev => [...prev, response.data]); // Assuming API returns the new slider
    } catch (err) {
      setError('Failed to add slider');
    }
  };

  const updateSlider = async (id: string, updates: Partial<Slider>) => {
    try {
      const response = await updateSliderAPI(id, updates); // Use updateSliderAPI
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
      await deleteSliderAPI(id); // Use deleteSliderAPI
      setSliders(prev => prev.filter(slider => slider._id !== id));
    } catch (err) {
      setError('Failed to delete slider');
    }
  };

  return (
    <SliderContext.Provider value={{ sliders, loading, error, addSlider, updateSlider, deleteSlider }}>
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
