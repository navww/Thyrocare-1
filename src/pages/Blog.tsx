import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, Clock, Search, TrendingUp, Heart, Brain } from "lucide-react";
import { useState, useContext } from "react";
import { BlogContext } from "@/contexts/BlogContext";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { blogs, loading, error } = useContext(BlogContext);

  const categories = ["All", ...new Set(blogs.map(blog => blog.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogs ? blogs.filter(post => {
    const matchesSearch = (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (post.category && post.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  const featuredPosts = blogs.filter(post => post.category === "Pharmaceutical Innovation");

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
            Health Blog
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Expert insights, health tips, and latest updates from medical professionals
          </p>
          <div className="flex items-center justify-center space-x-4 text-white/80">
            <TrendingUp className="w-5 h-5" />
            <span>Evidence-Based Articles • Expert Authored • Regularly Updated</span>
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
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">Featured Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular and important health articles curated by medical experts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredPosts.map((post) => (
              <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={post.imageUrl} alt={post.title} className="h-48 w-full object-cover"/>
                
                <CardHeader>
                  <Badge className="absolute top-4 left-4 bg-medical-blue text-white">
                    Featured
                  </Badge>
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    {post.category}
                  </Badge>
                  <CardTitle className="text-xl font-bold text-medical-blue leading-tight">
                    {post.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: post.content ? post.content.substring(0, 100) + '...' : '' }}></p>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" variant="medical-outline">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">All Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our comprehensive collection of health articles and guides
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={post.imageUrl} alt={post.title} className="h-40 w-full object-cover"/>
                
                <CardHeader className="pb-3">
                  <Badge variant="secondary" className="absolute top-3 right-3 text-xs">
                    {post.category}
                  </Badge>
                  <CardTitle className="text-lg font-bold text-medical-blue leading-tight">
                    {post.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: post.content ? post.content.substring(0, 100) + '...' : '' }}></p>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>

                  <Button className="w-full" variant="medical-outline" size="sm">
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Health Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-blue mb-4">Health Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore articles by health categories and find information relevant to your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card key="cardiac-health" className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Cardiac Health</h3>
              <p className="text-gray-600 text-sm mb-4">Heart health, cardiac tests, and prevention</p>
              <Badge variant="outline">12 Articles</Badge>
            </Card>

            <Card key="thyroid-health" className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Brain className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Thyroid Health</h3>
              <p className="text-gray-600 text-sm mb-4">Thyroid disorders and management</p>
              <Badge variant="outline">8 Articles</Badge>
            </Card>

            <Card key="preventive-care" className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Preventive Care</h3>
              <p className="text-gray-600 text-sm mb-4">Preventive healthcare and screening</p>
              <Badge variant="outline">15 Articles</Badge>
            </Card>

            <Card key="womens-health" className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <User className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Women's Health</h3>
              <p className="text-gray-600 text-sm mb-4">Women-specific health topics</p>
              <Badge variant="outline">10 Articles</Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-medical-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest health articles and updates directly in your inbox
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
