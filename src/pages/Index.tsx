import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ContactSection } from "@/components/ContactSection";

const images = [
  "/step1.webp",
  "/step2.webp",
  "/step3.webp",
];

const Index = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500); // 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      {/* Custom Auto-Play Image Slider Start */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative w-full max-w-4xl mx-auto">
            <img
              src={images[current]}
              alt={`Slide ${current + 1}`}
              className="h-64 w-full object-cover rounded-lg transition-all duration-700"
            />
            {/* Dots for navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full ${current === idx ? "bg-medical-blue" : "bg-gray-300"}`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Custom Auto-Play Image Slider End */}
      <ServicesSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <ContactSection />
    </div>
  );
};

export default Index;
