import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useServices } from '@/contexts/ServiceContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, Star, Check, AlertCircle, Download } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useContent } from '@/contexts/ContentContext';

export const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getService } = useServices();
  const { addConsultationSubmission } = useContent();
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '', description: '', files: [] as File[] });
  const [submitted, setSubmitted] = useState(false);
  
  const service = id ? getService(id) : null;
  
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

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Badge variant="outline" className="text-medical-blue border-medical-blue">
                  {service.category}
                </Badge>
                {service.isPopular && (
                  <Badge className="bg-medical-red text-white">Popular</Badge>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {service.title}
              </h1>
              <p className="text-xl text-gray-600">
                {service.description}
              </p>
            </div>
            
            <div className="mt-6 lg:mt-0 lg:text-right">
              <div className="text-3xl font-bold text-medical-blue mb-2">
                {service.price}
              </div>
              <div className="flex items-center justify-start lg:justify-end space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{service.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{service.patients} patients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            {service.image && (
              <Card>
                <CardContent className="p-0">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-64 lg:h-80 object-contain rounded-lg"
                  />
                </CardContent>
              </Card>
            )}

            {/* Detailed Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {service.detailedDescription && service.detailedDescription.trim() !== ''
                    ? service.detailedDescription
                    : 'No information available.'}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                {service.features && service.features.length > 0 ? (
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-400">No information available.</span>
                )}
              </CardContent>
            </Card>

            {/* Additional Images */}
            {service.additionalImages && service.additionalImages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {service.additionalImages.map((image, index) => (
                      <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={`${service.title} - Image ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Book This Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Price:</span>
                  <span className="text-2xl font-bold text-medical-blue">{service.price}</span>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
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
                
                <Button variant="outline" className="w-full">
                  Contact for Questions
                </Button>

                {/* {service.packageFileUrl && (
                  <a
                    href={service.packageFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <Button className="w-full" size="lg">
                      <Download className="w-4 h-4 mr-2" />
                      Download Package
                    </Button>
                  </a>
                )}
                 */}
                <div className="text-sm text-gray-500 text-center">
                  Duration: {service.duration}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            {service.requirements && service.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-500" />
                    <span>Requirements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-600">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Service Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{service.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Patients Served</span>
                  <span className="font-medium">{service.patients.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{service.duration}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
