import { ServiceCard } from "./ServiceCard";
import { useServices } from "@/contexts/ServiceContext";
import { Link } from "react-router-dom";

export const ServicesSection = () => {
  const { services } = useServices();

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer high-quality health checkup packages for all your needs.
            Feel free to consult with us anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.slice(0, 8).map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Please feel free to contact us about other medical packages as well
          </p>
          <Link to="/all-services" className="text-medical-blue hover:text-medical-red transition-colors font-medium">
            View All Packages →
          </Link>
        </div>
      </div>
    </section>
  );
};