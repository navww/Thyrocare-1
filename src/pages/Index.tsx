import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ContactSection } from "@/components/ContactSection";
import { useBackgroundImages } from "@/contexts/BackgroundContext";
import { BackgroundCarousel } from "@/components/BackgroundCarousel";
import { FaWhatsapp } from "react-icons/fa";

const Index = () => {
  const { backgroundImages } = useBackgroundImages();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <BackgroundCarousel images={backgroundImages} />
      <ServicesSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <ContactSection />
      <a
        href="https://wa.me/919663955546"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
};

export default Index;
