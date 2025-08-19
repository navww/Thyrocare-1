import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useContactInfo } from "@/contexts/ContactContext";
import { useState } from "react";
import api from "@/api";
import { useToast } from "@/components/ui/use-toast";

export const ContactSection = () => {
  const { contactInfo } = useContactInfo();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/contact/", formData);
      if (response.status === 201) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            If you have any questions or concerns, please feel free to contact us.
            Our professional staff will respond promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-medical-blue">
                Contact Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-medical-red">*</span>
                    </label>
                    <Input
                      placeholder="John Smith"
                      className="w-full"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      placeholder="+1 (555) 123-4567"
                      className="w-full"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-medical-red">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-medical-red">*</span>
                  </label>
                  <Input
                    placeholder="Consultation inquiry"
                    className="w-full"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-medical-red">*</span>
                  </label>
                  <Textarea
                    placeholder="Please describe your questions or concerns"
                    className="w-full min-h-[120px]"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" variant="medical" className="w-full py-6 text-lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-medical-blue">
                  Phone Consultation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-medical-blue">{contactInfo.phone}</p>
                    <p className="text-gray-600">Toll Free</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-medical-red rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600">{contactInfo.businessHours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-medical-blue">
                  Other Contact Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-medical-blue">{contactInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-medical-red rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    {contactInfo.address.map((addr, index) => (
                      <p key={index} className="text-gray-600">{addr}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </div>
    </section>
  );
};
