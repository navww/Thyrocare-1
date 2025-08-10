import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ServiceProvider } from "@/contexts/ServiceContext";
import { ContactProvider } from "@/contexts/ContactContext";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import { MenuProvider } from "@/contexts/MenuContext";
import { BackgroundProvider } from "@/contexts/BackgroundContext";
import { ContentProvider } from "@/contexts/ContentContext";
import { GlobalSettingsProvider } from "@/contexts/GlobalSettingsContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Offers from "./pages/Offers";
// ThyrocarePackage route removed
import BloodTest from "./pages/BloodTest";
import Blog from "./pages/Blog";
import { ServiceDetails } from "./pages/ServiceDetails";
import { AllServices } from "./pages/AllServices";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import { Admin } from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <GlobalSettingsProvider>
              <ServiceProvider>
              <ContactProvider>
                <SiteSettingsProvider>
                  <MenuProvider>
                    <BackgroundProvider>
                      <ContentProvider>
                        <AdminProvider>
                          <Toaster />
                          <Sonner />
                          <div className="App">
                            <Header />
                            <main>
                              <Routes>
                                <Route path="/" element={<Index />} />
                                <Route path="/offers" element={<Offers />} />
                                {/* ThyrocarePackage route removed */}
                                <Route path="/blood-test" element={<BloodTest />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/service/:id" element={<ServiceDetails />} />
                                <Route path="/all-services" element={<AllServices />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                            </main>
                            <Footer />
                          </div>
                        </AdminProvider>
                      </ContentProvider>
                    </BackgroundProvider>
                  </MenuProvider>
                </SiteSettingsProvider>
              </ContactProvider>
            </ServiceProvider>
          </GlobalSettingsProvider>
        </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
