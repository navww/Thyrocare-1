import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ContactSection } from "@/components/ContactSection";
import { useBackgroundImages } from "@/contexts/BackgroundContext";
import { BackgroundCarousel } from "@/components/BackgroundCarousel";

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
    </div>
  );
};

export default Index;
