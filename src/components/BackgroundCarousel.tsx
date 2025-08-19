import { useEffect, useState } from 'react';
import { BackgroundImage } from '@/contexts/BackgroundContext';

interface BackgroundCarouselProps {
  images: BackgroundImage[];
}

export const BackgroundCarousel = ({ images }: BackgroundCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-medical-blue-light to-white" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}
    </div>
  );
};
