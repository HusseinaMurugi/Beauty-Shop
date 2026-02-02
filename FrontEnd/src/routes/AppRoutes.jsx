import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ProductDetails from '../features/products/ProductDetails';
import Cart from '../features/cart/Cart';
import Checkout from '../features/orders/Checkout';
import Invoice from '../features/orders/Invoice';
import CategoryPage from '../pages/CategoryPage';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Profile from '../features/auth/Profile';
import Wishlist from '../features/wishlist/Wishlist';
import ContactUs from '../pages/ContactUs';
import OrderTracking from '../pages/OrderTracking';
import NewArrivals from '../pages/NewArrivals';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
      
      {/* Feature Pages */}
      <Route path="/wishlist" element={<MainLayout><Wishlist /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><ContactUs /></MainLayout>} />
      <Route path="/order-tracking" element={<MainLayout><OrderTracking /></MainLayout>} />
      <Route path="/new-arrivals" element={<MainLayout><NewArrivals /></MainLayout>} />
      
      {/* Dynamic Category Route */}
      <Route path="/:category" element={<MainLayout><CategoryPage /></MainLayout>} />
      
      <Route path="/product/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
      <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
      <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
      <Route path="/invoice/:orderId" element={<MainLayout><Invoice /></MainLayout>} />
    </Routes>
  );
};

export default AppRoutes;