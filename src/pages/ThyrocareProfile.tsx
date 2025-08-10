
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Award, Building2, Microscope } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/api";

const ThyrocareProfile = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/thyrocare-profile/");
        setProfileData(response.data);
      } catch (err) {
        setError("Failed to fetch profile data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  if (!profileData) {
    return <div className="flex justify-center items-center min-h-screen">No profile data available.</div>;
  }

  const {
    companyName,
    tagline,
    certifications,
    about,
    mission,
    vision,
    stats,
    services,
    leadership,
    contact
  } = profileData;

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-blue to-medical-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {companyName}
            </h1>
            <p className="text-xl mb-6">
              {tagline}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {certifications.map((cert: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-medical-blue mb-4">About Thyrocare</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {about}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6">
                <Building2 className="w-12 h-12 text-medical-blue mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  {mission}
                </p>
              </Card>

              <Card className="p-6">
                <Award className="w-12 h-12 text-medical-blue mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  {vision}
                </p>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat: { label: string; value: string }, index: number) => (
                <Card key={index} className="text-center p-6">
                  <div className="text-3xl font-bold text-medical-blue mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive diagnostic services across multiple specialties with state-of-the-art technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service: { category: string; description: string; tests: string[] }, index: number) => (
              <Card key={index} className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-medical-blue flex items-center">
                    <Microscope className="w-6 h-6 mr-2" />
                    {service.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tests.map((test: string, testIndex: number) => (
                      <Badge key={testIndex} variant="outline" className="text-xs">
                        {test}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Led by visionary leaders with decades of experience in healthcare and technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader: { name: string; title: string; bio: string; image: string }, index: number) => (
              <Card key={index} className="text-center p-6">
                <img src={leader.image} alt={leader.name} className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                <p className="text-medical-blue font-semibold mb-2">{leader.title}</p>
                <p className="text-gray-600 text-sm">
                  {leader.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-medical-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Contact us for any queries or to learn more about our services
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/10 border-white/20 text-center p-6">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Head Office</h3>
              <p className="text-sm text-white/80" dangerouslySetInnerHTML={{ __html: contact.address.replace(/\n/g, '<br/>') }} />
            </Card>

            <Card className="bg-white/10 border-white/20 text-center p-6">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-sm text-white/80" dangerouslySetInnerHTML={{ __html: contact.phone.replace(/\n/g, '<br/>') }} />
            </Card>

            <Card className="bg-white/10 border-white/20 text-center p-6">
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-sm text-white/80" dangerouslySetInnerHTML={{ __html: contact.email.replace(/\n/g, '<br/>') }} />
            </Card>

            <Card className="bg-white/10 border-white/20 text-center p-6">
              <Clock className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Working Hours</h3>
              <p className="text-sm text-white/80" dangerouslySetInnerHTML={{ __html: contact.hours.replace(/\n/g, '<br/>') }} />
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="secondary" size="lg">
              Contact Us Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThyrocareProfile;
