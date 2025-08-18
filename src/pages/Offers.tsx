
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Percent } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useContent } from "@/contexts/ContentContext";
import api from "@/api";

interface Offer {
  id: number;
  title: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  description: string;
  features: string[];
  validTill: string;
  popularity: string;
}

const Offers = () => {
  const { addConsultationSubmission } = useContent();
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '', description: '', files: [] as File[] });
  const [submitted, setSubmitted] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [referralForm, setReferralForm] = useState({ referrerEmail: '', referrerPhone: '', friendEmail: '', friendPhone: '' });
  const [referralSubmitted, setReferralSubmitted] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get('/offers');
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
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

  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferralForm({ ...referralForm, [e.target.name]: e.target.value });
  };

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/referrals', referralForm);
      setReferralSubmitted(true);
      setReferralForm({ referrerEmail: '', referrerPhone: '', friendEmail: '', friendPhone: '' });
    } catch (error) {
      console.error('Error submitting referral:', error);
    }
  };

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-blue to-medical-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Special Health Offers
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take advantage of our limited-time offers and save on premium health packages
          </p>
          <div className="flex items-center justify-center space-x-4 text-white/80">
            <Clock className="w-5 h-5" />
            <span>Limited Time Offers - Don't Miss Out!</span>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <Card key={offer.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-4 right-4">
                  <Badge variant="destructive" className="text-sm font-bold">
                    {offer.discount}
                  </Badge>
                </div>
                
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="text-xs">
                    {offer.popularity}
                  </Badge>
                </div>

                <CardHeader className="pt-12">
                  <CardTitle className="text-xl font-bold text-medical-blue">
                    {offer.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">
                      {offer.discountedPrice}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {offer.originalPrice}
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-sm text-medical-blue">Includes:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {offer.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Valid till {offer.validTill}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>1000+ booked</span>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="medical">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Promotions */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">
              Additional Promotions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take advantage of these special promotions to save even more on your health packages
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <Percent className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Bulk Booking Discount</h3>
              <p className="text-gray-600 mb-4">Book for 3+ family members and get additional 15% off</p>
              <Link to="/bulk-booking-discount">
                <Button variant="medical-outline">Learn More</Button>
              </Link>
            </Card>

            <Card className="text-center p-6">
              <Users className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Refer & Earn</h3>
              <p className="text-gray-600 mb-4">Refer friends and earn up to Rs.50 credit for each referral</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="medical-outline">Refer Now</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Refer a Friend</DialogTitle>
                    <DialogDescription>
                      Fill in your details and your friend's details to send a referral.
                    </DialogDescription>
                  </DialogHeader>
                  {referralSubmitted ? (
                    <div className="text-green-600 font-medium text-center py-4">Thank you for referring a friend!</div>
                  ) : (
                    <form onSubmit={handleReferralSubmit} className="space-y-4">
                      <Input
                        name="referrerEmail"
                        type="email"
                        placeholder="Your Email"
                        value={referralForm.referrerEmail}
                        onChange={handleReferralChange}
                        required
                      />
                      <Input
                        name="referrerPhone"
                        type="tel"
                        placeholder="Your Phone"
                        value={referralForm.referrerPhone}
                        onChange={handleReferralChange}
                        required
                      />
                      <Input
                        name="friendEmail"
                        type="email"
                        placeholder="Friend's Email"
                        value={referralForm.friendEmail}
                        onChange={handleReferralChange}
                        required
                      />
                      <Input
                        name="friendPhone"
                        type="tel"
                        placeholder="Friend's Phone"
                        value={referralForm.friendPhone}
                        onChange={handleReferralChange}
                        required
                      />
                      <DialogFooter>
                        <Button type="submit" variant="medical" className="w-full">Submit Referral</Button>
                        <DialogClose asChild>
                          <Button type="button" variant="outline" className="w-full">Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </Card>

            <Card className="text-center p-6">
              <Star className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Loyalty Program</h3>
              <p className="text-gray-600 mb-4">Join our loyalty program and earn points on every booking</p>
              <Button variant="medical-outline">Join Now</Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offers;
