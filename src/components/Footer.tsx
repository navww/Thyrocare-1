import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Shield, Heart, Users } from "lucide-react";
import { useContactInfo } from "@/contexts/ContactContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useServices } from "@/contexts/ServiceContext";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { contactInfo } = useContactInfo();
  const { siteSettings } = useSiteSettings();
  const { services } = useServices();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <div className="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <h3 className="text-xl font-bold text-medical-blue flex items-center">
                {siteSettings.websiteName && (
                  <>
                    <span className="text-medical-red">{siteSettings.websiteName.charAt(0)}</span>
                    {siteSettings.websiteName.slice(1)}
                  </>
                )}
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              We provide high-quality online medical services by trusted physicians.
              You can use our medical consultation services safely anytime, anywhere.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-medical-blue" />
                <span>Safe & Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Heart className="w-4 h-4 text-medical-red" />
                <span>Quality Care</span>
              </div>
            </div>
          </div>

          {/* Packages */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-medical-blue">Packages</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {services?.slice(0, 6).map((service) => (
                service && (
                  <li key={service.id}>
                    <Link to={`/service/${service.id}`} className="hover:text-white transition-colors">
                      {service.title && service.title.length > 30
                        ? service.title.substring(0, 30) + '...'
                        : service.title}
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-medical-blue">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">How to Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Payment Methods</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technical Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-medical-blue">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-medical-blue" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-medical-blue" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-start space-x-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-medical-blue mt-0.5" />
                <div>
                  <p>{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-medical-blue">50,000+</div>
              <div className="text-sm text-gray-400">Consultations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-medical-red">200+</div>
              <div className="text-sm text-gray-400">Partner Doctors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-medical-blue">4.8</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-medical-red">24h</div>
              <div className="text-sm text-gray-400">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 {siteSettings.websiteName || 'Thyrocare'}. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
