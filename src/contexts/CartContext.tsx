import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from './AuthContext';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const fetchCart = async () => {
    if (!token || !user) return;

    try {
      setLoading(true);
      const response = await api.get('/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': user._id,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (item) => {
    if (!token || !user) {
      navigate('/login');
      return;
    }
    try {
      const response = await api.post('/cart/add', item, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': user._id,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token || !user) {
      navigate('/login');
      return;
    }
    try {
      const response = await api.delete(`/cart/item/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': user._id,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    if (!token || !user) {
      navigate('/login');
      return;
    }
    try {
      await api.delete('/cart/clear', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': user._id,
        },
      });
      setCart({ items: [], totalAmount: 0 });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
