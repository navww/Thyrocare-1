import React, { useContext, useState } from 'react';
import { CartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import api from '../api';
import { useAuth } from '@/contexts/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart, loading } = useContext(CartContext);
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [bookingDetails, setBookingDetails] = useState({
    pincode: '',
    fullName: '',
    noOfPersons: 1,
    age: '',
    gender: '',
    mobile: '',
    email: '',
    address: '',
    appointmentDate: '',
    appointmentTime: '',
    wantsHardCopy: false,
    prescriptionFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setBookingDetails(prev => ({ ...prev, prescriptionFile: e.target.files[0] }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to book your test.',
        variant: 'destructive',
      });
      return;
    }

    const formData = new FormData();
    Object.keys(bookingDetails).forEach(key => {
      formData.append(key, bookingDetails[key]);
    });
    formData.append('paymentId', `temp_${Date.now()}`);

    try {
      await api.post('/orders/book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          'x-user-id': user.id,
        },
      });
      toast({
        title: 'Booking successful',
        description: 'Your blood test has been booked.',
      });
      clearCart();
    } catch (error) {
      toast({
        title: 'Booking failed',
        description: 'There was an error booking your test.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart && cart.items.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {cart.items.map(item => (
                  <div key={item.itemId} className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-semibold">Rs.{item.price * item.quantity}</p>
                      <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.itemId)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>Rs.{cart.totalAmount}</p>
                </div>
                <Button variant="outline" onClick={clearCart} className="w-full mt-4">
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-4">
                  <Input name="fullName" placeholder="Full Name" onChange={handleInputChange} required />
                  <Input name="pincode" placeholder="Pincode" onChange={handleInputChange} required />
                  <Input name="age" type="number" placeholder="Age" onChange={handleInputChange} required />
                  <Input name="gender" placeholder="Gender" onChange={handleInputChange} required />
                  <Input name="mobile" type="tel" placeholder="Mobile Number" onChange={handleInputChange} required />
                  <Input name="email" type="email" placeholder="Email" onChange={handleInputChange} required />
                  <Textarea name="address" placeholder="Address" onChange={handleInputChange} required />
                  <Input name="appointmentDate" type="date" onChange={handleInputChange} required />
                  <Input name="appointmentTime" type="time" onChange={handleInputChange} required />
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" name="wantsHardCopy" id="wantsHardCopy" onChange={handleInputChange} />
                    <label htmlFor="wantsHardCopy">Request hard copy of report</label>
                  </div>
                  <Input type="file" name="prescriptionFile" onChange={handleFileChange} />
                  <Button type="submit" className="w-full">Book Now</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
