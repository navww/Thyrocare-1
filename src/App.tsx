import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ServiceProvider } from "@/contexts/ServiceContext";
import { ContactProvider } from "@/contexts/ContactContext";
import { SiteSettingsProvider, useSiteSettings } from "@/contexts/SiteSettingsContext"; // Import useSiteSettings
import { MenuProvider } from "@/contexts/MenuContext";
import { BackgroundProvider } from "@/contexts/BackgroundContext";
import { BlogProvider } from "./contexts/BlogContext.tsx";
import { BloodTestProvider } from "./contexts/BloodTestContext.tsx";
import { SliderProvider } from "./contexts/SliderContext.tsx";
import { ContentProvider } from "@/contexts/ContentContext";
import { GlobalSettingsProvider } from "@/contexts/GlobalSettingsContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Offers from "./pages/Offers";
import BulkBookingDiscount from "./pages/BulkBookingDiscount";
// ThyrocarePackage route removed
import BloodTest from "./pages/BloodTest";
import Blog from "./pages/Blog";
import { ServiceDetails } from "./pages/ServiceDetails";
import { AllServices } from "./pages/AllServices";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import { Admin } from "./pages/Admin";
import React, { useEffect } from 'react'; // Import useEffect

const queryClient = new QueryClient();

const AppContent = () => {
  const { siteSettings } = useSiteSettings();

  useEffect(() => {
    // Update document title
    document.title = siteSettings.websiteName || "Thyrocare";

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', siteSettings.websiteName ? `${siteSettings.websiteName} - Your Health Partner` : "Lovable Generated Project");

    // Update Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', siteSettings.websiteName || "Thyrocare");

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', siteSettings.websiteName ? `${siteSettings.websiteName} - Your Health Partner` : "Lovable Generated Project");

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', siteSettings.logoUrl || "https://lovable.dev/opengraph-image-p98pqg.png");

    // Update Twitter meta tags
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.setAttribute('name', 'twitter:card');
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', "summary_large_image"); // Always summary_large_image for consistency

    let twitterSite = document.querySelector('meta[name="twitter:site"]');
    if (!twitterSite) {
      twitterSite = document.createElement('meta');
      twitterSite.setAttribute('name', 'twitter:site');
      document.head.appendChild(twitterSite);
    }
    twitterSite.setAttribute('content', "@thyrocare"); // Replace with actual Twitter handle if available

    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', siteSettings.logoUrl || "https://lovable.dev/opengraph-image-p98pqg.png");

    // Update favicon
    let faviconLink = document.querySelector('link[rel="icon"]');
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.setAttribute('rel', 'icon');
      document.head.appendChild(faviconLink);
    }
    faviconLink.setAttribute('href', siteSettings.favicon || "/favicon.ico");

  }, [siteSettings]);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/bulk-booking-discount" element={<BulkBookingDiscount />} />
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
  );
};

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
                            <BlogProvider>
                              <BloodTestProvider>
                                <SliderProvider>
                                  <Toaster />
                                  <Sonner />
                                  <AppContent /> {/* Render AppContent here */}
                                </SliderProvider>
                              </BloodTestProvider>
                            </BlogProvider>
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
