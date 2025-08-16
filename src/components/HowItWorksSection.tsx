import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const HowItWorksSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <p className="text-lg text-gray-600 text-center">It's really easy</p>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Here is how it works...</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardHeader className="flex flex-col items-center justify-center p-0 mb-4">
              <img src="/step1.webp" alt="Step 1" className="w-full h-48 object-cover rounded-lg mb-4" />
              <CardTitle className="text-xl font-semibold">Step 1</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <h3 className="text-lg font-medium mb-2">Browse Packages</h3>
              <p className="text-gray-600">Explore our wide range of Diagnostic Packages</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardHeader className="flex flex-col items-center justify-center p-0 mb-4">
              <img src="/step2.webp" alt="Step 2" className="w-full h-48 object-cover rounded-lg mb-4" />
              <CardTitle className="text-xl font-semibold">Step 2</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <h3 className="text-lg font-medium mb-2">Submit your Details</h3>
              <p className="text-gray-600">Fill out the contact form with your basic information</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardHeader className="flex flex-col items-center justify-center p-0 mb-4">
              <img src="/step3.webp" alt="Step 3" className="w-full h-48 object-cover rounded-lg mb-4" />
              <CardTitle className="text-xl font-semibold">Step 3</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <h3 className="text-lg font-medium mb-2">Arrange a Callback</h3>
              <p className="text-gray-600">Rest Assured that our team will contact you for test booking</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
