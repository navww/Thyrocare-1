import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/api';

interface MenuItem {
  _id: string;
  title: string;
  path: string;
  order: number;
}

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, '_id'>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  reorderMenuItems: (items: MenuItem[]) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get('/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, '_id'>) => {
    try {
      const response = await api.post('/menu', item);
      setMenuItems(prev => [...prev, response.data].sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const response = await api.put(`/menu/${id}`, updates);
      setMenuItems(prev =>
        prev.map(item =>
          item._id === id ? response.data : item
        ).sort((a, b) => a.order - b.order)
      );
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await api.delete(`/menu/${id}`);
      setMenuItems(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const reorderMenuItems = async (items: MenuItem[]) => {
    try {
      await api.put('/menu/reorder/all', { items });
      setMenuItems(items);
    } catch (error) {
      console.error('Error reordering menu items:', error);
    }
  };

  return (
    <MenuContext.Provider value={{
      menuItems,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      reorderMenuItems,
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
