import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/api";
import { isAxiosError } from "axios";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    // Check if required fields are filled
    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, email and password are required");
      setLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError("You must accept the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      // Call the registration API with the payload
      console.log("Signup attempt with:", formData);
      
      // Add headers to specify content type
      const response = await api.post('/user/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      console.log("Registration successful:", response.data);
      
      // Log in the user and redirect to the profile page
      login({ name: formData.name, email: formData.email });
      navigate("/profile");
    } catch (err) {
      console.error("Signup error:", err);
      
      // More detailed error handling
       if (isAxiosError(err)) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Error data:", err.response.data);
          
          // Display more specific error message if available
          if (err.response.data && err.response.data.message) {
            setError(err.response.data.message);
          } else if (err.response.status === 400) {
            setError("Invalid data. Please check your information and try again.");
          } else {
            setError("Failed to create account. Please try again.");
          }
        } else if (err.request) {
          // The request was made but no response was received
          setError("No response from server. Please check your internet connection.");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Failed to create account. Please try again.");
        }
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            <span className="text-medical-red">T</span>
            <span className="text-medical-blue">hyrocare</span> Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Create an account to access all features
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="acceptTerms" 
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => 
                    setFormData({
                      ...formData,
                      acceptTerms: checked as boolean,
                    })
                  }
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the{" "}
                  <Link to="/terms" className="text-medical-blue hover:underline">
                    terms and conditions
                  </Link>
                </label>
              </div>
              
              <Button 
                type="submit" 
                variant="medical" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-medical-blue hover:underline font-medium">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
