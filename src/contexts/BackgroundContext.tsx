import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import useAuth to access the token

export interface BackgroundImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

interface BackgroundContextType {
  backgroundImages: BackgroundImage[];
  addBackgroundImage: (image: Omit<BackgroundImage, 'id'>) => void;
  updateBackgroundImage: (id: string, image: Partial<BackgroundImage>) => void;
  deleteBackgroundImage: (id: string) => void;
  reorderBackgroundImages: (images: BackgroundImage[]) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundImages, setBackgroundImages] = useState<BackgroundImage[]>([]);
  const { token } = useAuth(); // Get the auth token

  useEffect(() => {
    const fetchBackgroundImages = async () => {
      try {
        const response = await fetch('https://thybackend.onrender.com/api/background-images');
        const data = await response.json();
        if (response.ok) {
          const formattedImages = data.map((image: any, index: number) => ({
            id: image._id,
            url: image.imageUrl || image.url, // Fallback for old data
            alt: image.altText || image.alt || `Background Image ${index + 1}`, // More robust fallback
            order: image.order || index + 1,
          }));
          setBackgroundImages(formattedImages);
        } else {
          console.error('Failed to fetch background images:', data.message);
        }
      } catch (error) {
        console.error('Error fetching background images:', error);
      }
    };

    fetchBackgroundImages();
  }, []);

  const addBackgroundImage = async (image: Omit<BackgroundImage, 'id'>) => {
    try {
      const payload = {
        url: image.url,
        alt: image.alt,
        order: image.order,
      };
      const response = await fetch('https://thybackend.onrender.com/api/background-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the token
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        const newImage = {
          id: data._id,
          url: data.url,
          alt: data.alt,
          order: data.order,
        };
        setBackgroundImages(prev => [...prev, newImage].sort((a, b) => a.order - b.order));
      } else {
        console.error('Failed to add background image:', data.message);
      }
    } catch (error) {
      console.error('Error adding background image:', error);
    }
  };

  const updateBackgroundImage = async (id: string, updates: Partial<BackgroundImage>) => {
    try {
      const payload: { [key: string]: any } = {};
      if (updates.url !== undefined) payload.url = updates.url;
      if (updates.alt !== undefined) payload.alt = updates.alt;
      if (updates.order !== undefined) payload.order = updates.order;

      if (Object.keys(payload).length === 0) {
        return;
      }

      const response = await fetch(`https://thybackend.onrender.com/api/background-images/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        const updatedImage = {
          id: data._id,
          url: data.url,
          alt: data.alt,
          order: data.order,
        };
        setBackgroundImages(prev =>
          prev.map(image =>
            image.id === id ? updatedImage : image
          ).sort((a, b) => a.order - b.order)
        );
      } else {
        console.error('Failed to update background image:', data.message);
      }
    } catch (error) {
      console.error('Error updating background image:', error);
    }
  };

  const deleteBackgroundImage = async (id: string) => {
    try {
      const response = await fetch(`https://thybackend.onrender.com/api/background-images/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setBackgroundImages(prev => prev.filter(image => image.id !== id));
      } else {
        const data = await response.json();
        console.error('Failed to delete background image:', data.message);
      }
    } catch (error) {
      console.error('Error deleting background image:', error);
    }
  };

  const reorderBackgroundImages = (images: BackgroundImage[]) => {
    setBackgroundImages(images);
  };

  return (
    <BackgroundContext.Provider value={{
      backgroundImages,
      addBackgroundImage,
      updateBackgroundImage,
      deleteBackgroundImage,
      reorderBackgroundImages,
    }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackgroundImages = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackgroundImages must be used within a BackgroundProvider');
  }
  return context;
};
