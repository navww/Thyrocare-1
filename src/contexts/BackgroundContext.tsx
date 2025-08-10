import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface BackgroundImage {
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

  useEffect(() => {
    const fetchBackgroundImages = async () => {
      try {
        const response = await fetch('https://thybackend.onrender.com/api/background-images');
        const data = await response.json();
        if (response.ok) {
          const formattedImages = data.map((image: any, index: number) => ({
            id: image._id,
            url: image.imageUrl,
            alt: image.altText || `Background Image ${index + 1}`,
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

  const addBackgroundImage = (image: Omit<BackgroundImage, 'id'>) => {
    const newImage: BackgroundImage = {
      ...image,
      id: Date.now().toString(),
    };
    setBackgroundImages(prev => [...prev, newImage].sort((a, b) => a.order - b.order));
  };

  const updateBackgroundImage = async (id: string, updates: Partial<BackgroundImage>) => {
    try {
      const response = await fetch(`https://thybackend.onrender.com/api/background-images/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (response.ok) {
        setBackgroundImages(prev =>
          prev.map(image =>
            image.id === id ? { ...image, ...data } : image
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
