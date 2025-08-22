import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, Menu, X, Settings, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useContactInfo } from "@/contexts/ContactContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useMenu } from "@/contexts/MenuContext";
import { useAdmin } from "@/contexts/AdminContext";
import { useAuth } from "@/contexts/AuthContext";
import { CartContext } from "@/contexts/CartContext";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { contactInfo } = useContactInfo();
  const { siteSettings } = useSiteSettings();
  const { menuItems } = useMenu();
  const { isLoggedIn } = useAdmin();
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useContext(CartContext);

  return (
    <header className="bg-background border-b shadow-md relative z-10">
      {/* Top contact bar */}
      <div className="bg-medical-blue text-white py-1">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Phone: {contactInfo.phone}</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Hours: {contactInfo.businessHours}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">{contactInfo.email}</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center min-h-[80px]">
          <div className="flex items-center">
            <Link to="/">
              <img src="/m.jpg" alt={siteSettings.websiteName + " Logo"} width="100" height="auto" />
            </Link>
          </div>

          {/* Desktop Menu and Auth Buttons */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-10">
              {menuItems.map((item) => (
                <Link 
                  key={item._id}
                  to={item.path} 
                  className="text-foreground hover:text-medical-blue transition-colors font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-3 ml-10">
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cart && cart.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.items.length}
                  </span>
                )}
              </Link>
              <Button variant="medical-outline" size="sm" asChild>
                <Link to="/admin">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              </Button>
              {isAuthenticated ? (
                <>
                  <Button variant="medical-outline" size="sm" asChild>
                    <Link to="/profile">Profile</Link>
                  </Button>
                  <Button variant="medical" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="medical-outline" size="sm" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button variant="medical" size="sm" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col space-y-2 pt-4">
              {menuItems.map((item) => (
                <Link 
                  key={item._id}
                  to={item.path} 
                  className="text-foreground hover:text-medical-blue transition-colors py-2 px-4 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              
              <div className="border-t my-2"></div>

              <div className="flex flex-col space-y-2 pt-2 px-4">
                <Button variant="medical-outline" size="sm" className="w-full" asChild>
                  <Link to="/admin">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                </Button>
                {isAuthenticated ? (
                  <>
                    <Button variant="medical-outline" size="sm" className="w-full" asChild>
                      <Link to="/profile">Profile</Link>
                    </Button>
                    <Button variant="medical" size="sm" className="w-full" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="medical-outline" size="sm" className="w-full" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="medical" size="sm" className="w-full" asChild>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
