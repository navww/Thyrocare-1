import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Droplet, Clock, Shield, Star, Filter } from "lucide-react";
import { useState, useContext } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useContent } from "@/contexts/ContentContext";
import { BloodTestContext } from "@/contexts/BloodTestContext";

const BloodTest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addConsultationSubmission } = useContent();
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '', description: '', files: [] as File[] });
  const [submitted, setSubmitted] = useState(false);
  const { bloodTests, loading, error } = useContext(BloodTestContext);

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

  const categories = ["All", ...new Set(bloodTests.map(test => test.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTests = bloodTests ? bloodTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  const popularTests = bloodTests.slice(0, 6);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-blue to-medical-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blood Test Services
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Comprehensive blood testing services with accurate results and expert analysis
          </p>
          <div className="flex items-center justify-center space-x-4 text-white/80">
            <Droplet className="w-5 h-5" />
            <span>NABL Accredited Labs • Fast Results • Home Collection Available</span>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search blood tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-medical-blue"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tests */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">Popular Blood Tests</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Most commonly ordered blood tests with special pricing and fast results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTests.map((test) => (
              <Card key={test._id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-4 right-4">
                  <Badge variant="destructive">Popular</Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-medical-blue pr-16">
                    {test.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">${test.price}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{test.description}</p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="medical" size="sm">
                        Book Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Book a Blood Test</DialogTitle>
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

      {/* All Tests */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">All Blood Tests</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete list of available blood tests with detailed information
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <Card key={test._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-bold text-medical-blue flex-1">
                      {test.name}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs ml-2">
                      {test.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-green-600">${test.price}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{test.description}</p>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="medical-outline" size="sm">
                        Book Test
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Book a Blood Test</DialogTitle>
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

          {filteredTests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tests found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">Why Choose Our Blood Tests</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <Shield className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">NABL Accredited</h3>
              <p className="text-gray-600 text-sm">All tests performed in NABL accredited laboratories</p>
            </Card>

            <Card className="text-center p-6">
              <Clock className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Fast Results</h3>
              <p className="text-gray-600 text-sm">Get your reports within 6-24 hours</p>
            </Card>

            <Card className="text-center p-6">
              <Droplet className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Home Collection</h3>
              <p className="text-gray-600 text-sm">Free home sample collection service available</p>
            </Card>

            <Card className="text-center p-6">
              <Star className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Expert Analysis</h3>
              <p className="text-gray-600 text-sm">Reports reviewed by experienced pathologists</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloodTest;
