import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useGlobalSettings } from "@/contexts/GlobalSettingsContext";
import { useContent } from "@/contexts/ContentContext";
import { useState } from "react";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: string | number;
  duration: string;
  rating: number;
  patients: number;
  isPopular?: boolean;
  category: string;
  imageAlt: string;
  image?: string;
}

export const ServiceCard = ({
  id,
  title,
  description,
  price,
  duration,
  rating,
  patients,
  isPopular = false,
  category,
  imageAlt,
  image
}: ServiceCardProps) => {
  const { settings } = useGlobalSettings();
  const { addConsultationSubmission } = useContent();
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '', description: '', files: [] as File[] });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, files: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addConsultationSubmission({
      name: form.name,
      email: form.email,
      address: form.address,
      phone: form.phone,
      description: form.description,
      files: form.files.map(f => f.name),
    });
    setForm({ name: '', email: '', address: '', phone: '', description: '', files: [] });
    setSubmitted(true);
  };

  return (
    <Card className="relative group hover:shadow-xl transition-all duration-300 border-2 hover:border-medical-blue">
      {isPopular && (
        <div className="absolute -top-3 left-4 z-10">
          <Badge className="bg-medical-red text-white">Popular</Badge>
        </div>
      )}
      
      <CardHeader className="p-4 pb-2 md:p-6 md:pb-4">
        {/* Image */}
        <div className="aspect-[4/3] bg-gradient-to-br from-medical-blue-light to-white rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-2">
                {/* Icon can be placed here if needed */}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Badge variant="outline" className="text-medical-blue border-medical-blue">{category}</Badge>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-medical-blue transition-colors h-14">
            {title}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 md:p-6 md:pt-2 space-y-4">
        <p className="text-gray-600 text-sm leading-relaxed h-20">
          {description.length > 110 ? (
            <>
              {description.slice(0, 110)}...
              <Button asChild variant="link" className="p-0 h-auto align-baseline text-medical-blue ml-1 text-xs font-medium">
                <Link to={`/service/${id}`}>More</Link>
              </Button>
            </>
          ) : (
            description
          )}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-between text-xs md:text-sm text-gray-500 gap-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{patients} patients</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              {price != null && price !== '' ? (
                <>
                  <span className="text-xl md:text-2xl font-bold text-medical-blue">
                    ₹{String(price).replace(/^[\$₹€£¥]/, '')}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">+</span>
                </>
              ) : (
                <span className="text-base md:text-lg font-semibold text-gray-600">Price on request</span>
              )}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant={isPopular ? "medical-red" : "medical"} 
                  size="sm"
                  className="shrink-0 w-full sm:w-auto"
                >
                  Book Now
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book a Package</DialogTitle>
                  <DialogDescription>
                    Please fill in your details and we will contact you soon.
                  </DialogDescription>
                </DialogHeader>
                {submitted ? (
                  <div className="text-green-600 font-medium text-center py-4">Thank you! We have received your request.</div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                    <Input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
                    <Input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                    <Input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
                    <Textarea name="description" placeholder="Description (e.g. symptoms, reason for test, etc.)" value={form.description} onChange={handleChange} required />
                    <input type="file" multiple accept="image/*,application/pdf" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-medical-blue file:text-white hover:file:bg-medical-blue/80" />
                    <DialogFooter>
                      <Button type="submit" variant="medical" className="w-full">Submit</Button>
                      <DialogClose asChild>
                        <Button type="button" variant="outline" className="w-full">Cancel</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
          
          <Button variant="outline" className="w-full text-sm" asChild>
            <Link to={`/service/${id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
