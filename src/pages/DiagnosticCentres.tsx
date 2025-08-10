
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Clock, Star, Search, Navigation, Shield } from "lucide-react";
import { useState } from "react";

const DiagnosticCentres = () => {
  const [searchLocation, setSearchLocation] = useState("");

  const centres = [
    {
      id: 1,
      name: "Thyrocare Central Lab - Mumbai",
      address: "Plot No. D-37/1, TTC Industrial Area, Turbhe, Navi Mumbai - 400705",
      city: "Mumbai",
      state: "Maharashtra",
      phone: "+91-22-6718-6666",
      rating: 4.8,
      reviews: 2450,
      timings: "Mon-Sat: 7:00 AM - 7:00 PM, Sun: 8:00 AM - 2:00 PM",
      services: ["Blood Tests", "Radiology", "Pathology", "Cardiology", "Home Collection"],
      featured: true,
      distance: "2.5 km"
    },
    {
      id: 2,
      name: "Thyrocare - Andheri West",
      address: "Shop No. 15, Ground Floor, Sai Plaza, S.V. Road, Andheri West, Mumbai - 400058",
      city: "Mumbai",
      state: "Maharashtra",
      phone: "+91-22-2674-5678",
      rating: 4.6,
      reviews: 1890,
      timings: "Mon-Sat: 7:30 AM - 7:30 PM, Sun: 8:00 AM - 2:00 PM",
      services: ["Blood Tests", "Pathology", "Home Collection", "Report Delivery"],
      featured: false,
      distance: "5.2 km"
    },
    {
      id: 3,
      name: "Thyrocare - Bandra",
      address: "2nd Floor, Bandra Plaza, Linking Road, Bandra West, Mumbai - 400050",
      city: "Mumbai",
      state: "Maharashtra",
      phone: "+91-22-2605-9876",
      rating: 4.7,
      reviews: 2100,
      timings: "Mon-Sat: 7:00 AM - 8:00 PM, Sun: 8:00 AM - 3:00 PM",
      services: ["Blood Tests", "Radiology", "Pathology", "Women's Health", "Home Collection"],
      featured: true,
      distance: "7.8 km"
    },
    {
      id: 4,
      name: "Thyrocare - Pune Central",
      address: "Ground Floor, Vishwa Complex, FC Road, Shivajinagar, Pune - 411005",
      city: "Pune",
      state: "Maharashtra",
      phone: "+91-20-2553-1234",
      rating: 4.5,
      reviews: 1650,
      timings: "Mon-Sat: 7:30 AM - 7:00 PM, Sun: 8:00 AM - 2:00 PM",
      services: ["Blood Tests", "Pathology", "Executive Health", "Home Collection"],
      featured: false,
      distance: "1.2 km"
    },
    {
      id: 5,
      name: "Thyrocare - Koregaon Park",
      address: "Lane 5, Koregaon Park, Near Osho Ashram, Pune - 411001",
      city: "Pune",
      state: "Maharashtra",
      phone: "+91-20-2615-7890",
      rating: 4.8,
      reviews: 1920,
      timings: "Mon-Sat: 7:00 AM - 7:30 PM, Sun: 8:00 AM - 2:30 PM",
      services: ["Blood Tests", "Radiology", "Pathology", "Preventive Health", "Home Collection"],
      featured: true,
      distance: "3.7 km"
    },
    {
      id: 6,
      name: "Thyrocare - Delhi CP",
      address: "Block A, Connaught Place, New Delhi - 110001",
      city: "Delhi",
      state: "Delhi",
      phone: "+91-11-4567-8901",
      rating: 4.6,
      reviews: 2800,
      timings: "Mon-Sat: 7:30 AM - 8:00 PM, Sun: 8:00 AM - 3:00 PM",
      services: ["Blood Tests", "Radiology", "Pathology", "Cardiology", "Home Collection"],
      featured: false,
      distance: "4.1 km"
    },
    {
      id: 7,
      name: "Thyrocare - Bangalore HSR",
      address: "27th Main, HSR Layout Sector 2, Bangalore - 560102",
      city: "Bangalore",
      state: "Karnataka",
      phone: "+91-80-4123-5678",
      rating: 4.7,
      reviews: 2200,
      timings: "Mon-Sat: 7:00 AM - 7:30 PM, Sun: 8:00 AM - 2:00 PM",
      services: ["Blood Tests", "Pathology", "Corporate Health", "Home Collection"],
      featured: true,
      distance: "2.9 km"
    },
    {
      id: 8,
      name: "Thyrocare - Chennai T. Nagar",
      address: "Ground Floor, Ranganathan Street, T. Nagar, Chennai - 600017",
      city: "Chennai",
      state: "Tamil Nadu",
      phone: "+91-44-2834-5678",
      rating: 4.5,
      reviews: 1750,
      timings: "Mon-Sat: 7:30 AM - 7:00 PM, Sun: 8:00 AM - 2:30 PM",
      services: ["Blood Tests", "Pathology", "Women's Health", "Home Collection"],
      featured: false,
      distance: "6.3 km"
    }
  ];

  const filteredCentres = centres.filter(centre => 
    centre.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
    centre.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
    centre.address.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const featuredCentres = centres.filter(centre => centre.featured);

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-blue to-medical-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Diagnostic Centres
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Find Thyrocare diagnostic centres near you with advanced facilities and expert care
          </p>
          <div className="flex items-center justify-center space-x-4 text-white/80">
            <MapPin className="w-5 h-5" />
            <span>2000+ Centres Across India • Home Collection Available</span>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by city, area, or centre name..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="medical">
                <Navigation className="w-4 h-4 mr-2" />
                Near Me
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Centres */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">Featured Centres</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our premium diagnostic centres with advanced facilities and comprehensive services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCentres.map((centre) => (
              <Card key={centre.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-4 right-4">
                  <Badge variant="destructive">Featured</Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-medical-blue pr-20">
                    {centre.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold ml-1">{centre.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({centre.reviews} reviews)</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">{centre.address}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 text-sm">{centre.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 text-sm">{centre.timings}</span>
                    </div>

                    <div className="pt-2">
                      <h4 className="font-semibold text-sm text-medical-blue mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-1">
                        {centre.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-sm text-gray-500">
                        📍 {centre.distance} away
                      </div>
                      <Button variant="medical" size="sm">
                        Visit Centre
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Centres */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">All Diagnostic Centres</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete list of Thyrocare diagnostic centres with locations and contact details
            </p>
          </div>
          
          <div className="space-y-4">
            {filteredCentres.map((centre) => (
              <Card key={centre.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-medical-blue">{centre.name}</h3>
                        {centre.featured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">{centre.address}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 text-sm">{centre.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold text-sm">{centre.rating}</span>
                            <span className="text-gray-500 text-sm">({centre.reviews})</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 text-sm">{centre.timings}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm text-medical-blue mb-2">Available Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {centre.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="text-right mb-4">
                        <div className="text-sm text-gray-500 mb-1">Distance</div>
                        <div className="text-lg font-semibold text-medical-blue">{centre.distance}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button className="w-full" variant="medical">
                          Get Directions
                        </Button>
                        <Button className="w-full" variant="medical-outline">
                          Call Centre
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCentres.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No diagnostic centres found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">Why Choose Our Centres</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <Shield className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">NABL Accredited</h3>
              <p className="text-gray-600 text-sm">All centres are NABL accredited with quality assurance</p>
            </Card>

            <Card className="text-center p-6">
              <Clock className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Extended Hours</h3>
              <p className="text-gray-600 text-sm">Open 7 days a week with extended working hours</p>
            </Card>

            <Card className="text-center p-6">
              <MapPin className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Convenient Locations</h3>
              <p className="text-gray-600 text-sm">Centres located in prime areas with easy accessibility</p>
            </Card>

            <Card className="text-center p-6">
              <Star className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Expert Staff</h3>
              <p className="text-gray-600 text-sm">Trained professionals ensuring quality service</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiagnosticCentres;