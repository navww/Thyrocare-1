import { ServiceCard } from "@/components/ServiceCard";
import { useServices } from "@/contexts/ServiceContext";

export const AllServices = () => {
  const { services } = useServices();
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            All Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our complete range of health checkup packages.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};