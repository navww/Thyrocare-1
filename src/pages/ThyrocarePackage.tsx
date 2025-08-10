
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Star, Shield } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useContent } from "@/contexts/ContentContext";
import api from "@/api";

interface Package {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  tests_included: string;
  description: string;
  report_time: string;
  sample_type: string;
  fasting_required: string;
  popular: boolean;
}

const ThyrocarePackage = () => {
  const { addConsultationSubmission } = useContent();
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '', description: '', files: [] as File[] });
  const [submitted, setSubmitted] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/thyroid-packages/");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching thyroid packages:", error);
      }
    };

    fetchPackages();
  }, []);

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

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-medical-blue" />,
      title: "NABL Accredited Labs",
      description: "All tests performed in NABL accredited laboratories"
    },
    {
      icon: <Clock className="w-6 h-6 text-medical-blue" />,
      title: "Fast Results",
      description: "Get your reports within 6-24 hours"
    },
    {
      icon: <Users className="w-6 h-6 text-medical-blue" />,
      title: "Expert Consultation",
      description: "Free consultation with endocrinologist"
    },
    {
      icon: <Star className="w-6 h-6 text-medical-blue" />,
      title: "Home Sample Collection",
      description: "Convenient home sample collection available"
    }
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-blue to-medical-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Thyrocare Packages
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Comprehensive thyroid health packages with accurate results and expert consultation
          </p>
          <div className="flex items-center justify-center space-x-4 text-white/80">
            <Shield className="w-5 h-5" />
            <span>NABL Accredited • ISO Certified • Trusted by Millions</span>
          </div>
        </div>
      </section>

      {/* About Thyroid Health */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-6">
              Why Thyroid Health Matters
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              The thyroid gland plays a crucial role in regulating metabolism, energy levels, and overall health. 
              Thyroid disorders are common but often go undiagnosed. Regular thyroid screening can help detect 
              issues early and ensure proper treatment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">
              Choose Your Thyroid Package
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select from our range of thyroid packages designed to meet different health needs and budgets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative overflow-hidden ${pkg.popular ? 'ring-2 ring-medical-blue' : ''}`}>
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-medical-blue text-white px-4 py-1 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-medical-blue">
                    {pkg.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-green-600">
                      ₹{pkg.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{pkg.originalPrice}
                    </span>
                    <Badge variant="secondary">
                      Save {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}%
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <h4 className="font-semibold text-sm text-medical-blue mb-2">Tests Included:</h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.tests_included.split(',').map((test, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {test.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>{pkg.report_time}</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>{pkg.sample_type}</span>
                      </div>
                      <div className="flex items-center col-span-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>{pkg.fasting_required}</span>
                      </div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant={pkg.popular ? "medical" : "medical-outline"}>
                        Book Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Book a Thyroid Package</DialogTitle>
                        <DialogDescription>
                          Please fill in your details and we will contact you soon.
                        </DialogDescription>
                      </DialogHeader>
                      {submitted ? (
                        <div className="text-green-600 font-medium text-center py-4">Thank you! We have received your request.</div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <Input
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                          />
                          <Input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            required
                          />
                          <Input
                            name="address"
                            placeholder="Address"
                            value={form.address}
                            onChange={handleChange}
                            required
                          />
                          <Input
                            name="phone"
                            type="tel"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            required
                          />
                          <Textarea
                            name="description"
                            placeholder="Description (e.g. symptoms, reason for test, etc.)"
                            value={form.description}
                            onChange={handleChange}
                            required
                          />
                          <input
                            type="file"
                            multiple
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-medical-blue file:text-white hover:file:bg-medical-blue/80"
                          />
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Thyrocare */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">
              Why Choose Thyrocare
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              India's leading diagnostic chain with cutting-edge technology and expert healthcare professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-medical-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">NABL accredited labs with stringent quality control measures</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-medical-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Team</h3>
              <p className="text-gray-600">Experienced pathologists and healthcare professionals</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-medical-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Results</h3>
              <p className="text-gray-600">Fast and accurate test results with digital reports</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThyrocarePackage;
