import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Stethoscope } from 'lucide-react';

export const WhyChooseUsSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardHeader className="flex flex-col items-center justify-center p-0 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold">Quality and Trust assured</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600">Up to 95% samples processed in NABL-accredited labs</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardHeader className="flex flex-col items-center justify-center p-0 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold">On-time Mantra</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600">*Reports in 6 hrs after samples reach the lab</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardHeader className="flex flex-col items-center justify-center p-0 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold">Trusted by doctors</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600">9 out of 10 doctors trust that Thyrocare reports are accurate and reliable*</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
