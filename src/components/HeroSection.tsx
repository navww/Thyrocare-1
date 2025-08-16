import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Shield, Users, Stethoscope, Brain } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { BackgroundCarousel } from "@/components/BackgroundCarousel";
import { useContent } from "@/contexts/ContentContext";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSliders } from "@/contexts/SliderContext";

export const HeroSection = () => {
  const { siteSettings } = useSiteSettings();
  const { bannerContent, aboutSection, addConsultationSubmission } = useContent();
  const { sliders } = useSliders();
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
    // For now, just store file names, you can extend to upload to server if needed
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
    <section className="relative pt-8 pb-12 md:pt-4 md:pb-8 min-h-[600px] overflow-hidden">
      <BackgroundCarousel images={sliders} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {bannerContent.title}
              <span className="text-medical-blue block mt-2">{bannerContent.subtitle}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {bannerContent.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="medical" size="lg" className="text-lg px-8 py-6">
                    Book a Package
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
              <Link to="/all-services">
                <Button variant="medical-outline" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                  View All Packages
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {aboutSection.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-3">
                    {index === 0 && <Clock className="w-8 h-8 text-white" />}
                    {index === 1 && <Shield className="w-8 h-8 text-white" />}
                    {index === 2 && <Users className="w-8 h-8 text-white" />}
                    {index === 3 && <Stethoscope className="w-8 h-8 text-white" />}
                    {index === 4 && <Brain className="w-8 h-8 text-white" />}
                  </div>
                  <p className="text-base font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Doctor image placeholder */}
          <div className="relative hidden lg:block">
            <Card className="bg-white p-8 shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-medical-blue-light to-medical-red-light rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-10 h-10 text-white" />
                  </div>
                  <img src="/main.jpg" alt="Doctor" className="rounded-lg" />
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">{aboutSection.title}</h3>
                <p className="text-gray-600 mt-2">
                  {aboutSection.description}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
