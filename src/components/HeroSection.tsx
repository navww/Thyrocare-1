import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import { BackgroundCarousel } from "@/components/BackgroundCarousel";
import { useContent } from "@/contexts/ContentContext";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSliders } from "@/contexts/SliderContext";

export const HeroSection = () => {
  const { aboutSection, addConsultationSubmission } = useContent();
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
  
  const formattedSliders = sliders.map(slider => ({
    id: slider._id,
    url: slider.imageUrl,
    alt: slider.altText,
    order: slider.order,
  }));

  return (
    <section className="relative min-h-[500px] md:min-h-[500px] overflow-hidden flex items-stretch">
      <BackgroundCarousel images={formattedSliders} />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch w-full">
          {/* Left content */}
          <div className="space-y-4 md:space-y-6 text-left py-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Test and you can Trust
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
              {/* New Packages */}
              <Link to="/service/68ac3f0e8f57028aa03b8134" className="bg-white p-4 rounded-lg text-center shadow-lg">
                <h3 className="font-bold text-lg text-medical-blue">Aarogyam C plus</h3>
                <p className="text-gray-700">97 Tests</p>
                <p className="text-xl font-bold text-medical-red mt-2">Rs1799</p>
              </Link>
              <Link to="/service/68ac3f668f57028aa03b814b" className="bg-white p-4 rounded-lg text-center shadow-lg">
                <h3 className="font-bold text-lg text-medical-blue">Aarogyam D plus</h3>
                <p className="text-gray-700">114 Tests</p>
                <p className="text-xl font-bold text-medical-red mt-2">Rs2999</p>
              </Link>
              <Link to="/service/68ac40a58f57028aa03b81a7" className="bg-white p-4 rounded-lg text-center shadow-lg">
                <h3 className="font-bold text-lg text-medical-blue">Aarogyam Stree</h3>
                <p className="text-gray-700">110 Tests</p>
                <p className="text-xl font-bold text-medical-red mt-2">Rs2599</p>
              </Link>
              <Link to="/service/68ac40f98f57028aa03b81be" className="bg-white p-4 rounded-lg text-center shadow-lg">
                <h3 className="font-bold text-lg text-medical-blue">Aarogyam Purush</h3>
                <p className="text-gray-700">107 Tests</p>
                <p className="text-xl font-bold text-medical-red mt-2">Rs2599</p>
              </Link>
              <Link to="/service/68ac3fc68f57028aa03b8162" className="bg-white p-4 rounded-lg text-center shadow-lg">
                <h3 className="font-bold text-lg text-medical-blue">Aarogyam E plus</h3>
                <p className="text-gray-700">118 Tests</p>
                <p className="text-xl font-bold text-medical-red mt-2">Rs3599</p>
              </Link>
              <Link to="/service/68ac41a58f57028aa03b81ec" className="bg-white p-4 rounded-lg text-center shadow-lg">
                <h3 className="font-bold text-lg text-medical-blue">Aarogyam XL Plus</h3>
                <p className="text-gray-700">163 Tests</p>
                <p className="text-xl font-bold text-medical-red mt-2">Rs5999</p>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-start mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="medical" size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-6 w-full sm:w-auto">
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
          </div>

          {/* Right content - Doctor image placeholder */}
          <div className="relative hidden lg:block h-full">
            <Card className="bg-white p-8 shadow-xl h-full flex flex-col justify-center">
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
