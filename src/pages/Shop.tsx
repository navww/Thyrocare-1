
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Star, Filter, Heart, Truck } from "lucide-react";
import { useState } from "react";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const products = [
    {
      id: 1,
      name: "Digital Blood Pressure Monitor",
      price: "$89",
      originalPrice: "$129",
      rating: 4.5,
      reviews: 1250,
      description: "Accurate digital BP monitor with large display and memory function",
      category: "Monitoring Devices",
      inStock: true,
      fastDelivery: true,
      popular: true,
      image: "/api/placeholder/300/300"
    },
    {
      id: 2,
      name: "Blood Glucose Test Strips (50 count)",
      price: "$25",
      originalPrice: "$35",
      rating: 4.8,
      reviews: 890,
      description: "Compatible test strips for accurate blood glucose monitoring",
      category: "Diabetes Care",
      inStock: true,
      fastDelivery: false,
      popular: true,
      image: "/api/placeholder/300/300"
    },
    {
      id: 3,
      name: "Thyroid Support Supplement",
      price: "$45",
      originalPrice: "$60",
      rating: 4.3,
      reviews: 650,
      description: "Natural thyroid support with iodine and selenium",
      category: "Supplements",
      inStock: true,
      fastDelivery: true,
      popular: false,
      image: "/api/placeholder/300/300"
    },
    {
      id: 4,
      name: "Heart Rate Monitor Watch",
      price: "$199",
      originalPrice: "$299",
      rating: 4.6,
      reviews: 2100,
      description: "Advanced fitness tracker with continuous heart rate monitoring",
      category: "Fitness Trackers",
      inStock: true,
      fastDelivery: true,
      popular: true,
      image: "/api/placeholder/300/300"
    },
    {
      id: 5,
      name: "Vitamin D3 Supplements (60 tablets)",
      price: "$22",
      originalPrice: "$30",
      rating: 4.7,
      reviews: 1450,
      description: "High potency Vitamin D3 for bone and immune health",
      category: "Supplements",
      inStock: true,
      fastDelivery: false,
      popular: false,
      image: "/api/placeholder/300/300"
    },
    {
      id: 6,
      name: "Digital Thermometer",
      price: "$15",
      originalPrice: "$25",
      rating: 4.4,
      reviews: 780,
      description: "Fast and accurate digital thermometer with fever alarm",
      category: "Basic Medical",
      inStock: true,
      fastDelivery: true,
      popular: false,
      image: "/api/placeholder/300/300"
    },
    {
      id: 7,
      name: "Omega-3 Fish Oil Capsules",
      price: "$35",
      originalPrice: "$50",
      rating: 4.5,
      reviews: 920,
      description: "Premium omega-3 supplements for heart and brain health",
      category: "Supplements",
      inStock: true,
      fastDelivery: false,
      popular: true,
      image: "/api/placeholder/300/300"
    },
    {
      id: 8,
      name: "Pulse Oximeter",
      price: "$65",
      originalPrice: "$85",
      rating: 4.6,
      reviews: 1100,
      description: "Fingertip pulse oximeter for oxygen saturation monitoring",
      category: "Monitoring Devices",
      inStock: false,
      fastDelivery: false,
      popular: false,
      image: "/api/placeholder/300/300"
    },
    {
      id: 9,
      name: "Multivitamin for Women",
      price: "$28",
      originalPrice: "$40",
      rating: 4.4,
      reviews: 750,
      description: "Complete multivitamin formula designed for women's health",
      category: "Supplements",
      inStock: true,
      fastDelivery: true,
      popular: false,
      image: "/api/placeholder/300/300"
    }
  ];

  const categories = ["All", "Monitoring Devices", "Diabetes Care", "Supplements", "Fitness Trackers", "Basic Medical"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularProducts = products.filter(product => product.popular);

  const addToCart = (productId: number) => {
    setCartCount(cartCount + 1);
    // Add cart logic here
  };

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-blue to-medical-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Health Shop
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Quality health products, medical devices, and supplements delivered to your door
          </p>
          <div className="flex items-center justify-center space-x-4 text-white/80">
            <ShoppingCart className="w-5 h-5" />
            <span>Free Shipping on Orders Over $50 • Authentic Products • Fast Delivery</span>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
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
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-medical-blue" />
                <span className="text-medical-blue font-semibold">{cartCount} items</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">Popular Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our best-selling health products trusted by thousands of customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <Card key={product.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="destructive">Popular</Badge>
                </div>
                <div className="absolute top-3 left-3 z-10">
                  <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="h-48 bg-gray-200 relative">
                  {product.fastDelivery && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        <Truck className="w-3 h-3 mr-1" />
                        Fast Delivery
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-medical-blue leading-tight">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-green-600">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-semibold">{product.rating}</span>
                      <span className="text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>

                  <Button 
                    className="w-full" 
                    variant="medical"
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    ) : (
                      "Out of Stock"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">All Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our complete collection of health and medical products
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-3 right-3 z-10">
                  <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="h-40 bg-gray-200 relative">
                  {product.fastDelivery && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        <Truck className="w-3 h-3 mr-1" />
                        Fast
                      </Badge>
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-medical-blue leading-tight">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-green-600">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-semibold">{product.rating}</span>
                      <span className="text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>

                  <Button 
                    className="w-full" 
                    variant={product.inStock ? "medical" : "outline"}
                    onClick={() => product.inStock && addToCart(product.id)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    ) : (
                      "Out of Stock"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">Why Shop With Us</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <Truck className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">Free delivery on orders over $50</p>
            </Card>

            <Card className="text-center p-6">
              <Star className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Quality Assured</h3>
              <p className="text-gray-600 text-sm">Only authentic and certified products</p>
            </Card>

            <Card className="text-center p-6">
              <ShoppingCart className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day hassle-free return policy</p>
            </Card>

            <Card className="text-center p-6">
              <Heart className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">Healthcare professionals to assist you</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;