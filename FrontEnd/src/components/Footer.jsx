import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-gray-900">Bloom Beauty</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering your beauty journey with premium products designed to make you shine inside and out.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 transition"><Instagram size={16} /></a>
              <a href="#" className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 transition"><Facebook size={16} /></a>
              <a href="#" className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 transition"><Twitter size={16} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-bold text-gray-900 mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/skincare" className="hover:text-pink-600 transition">Skincare</Link></li>
              <li><Link to="/haircare" className="hover:text-pink-600 transition">Haircare</Link></li>
              <li><Link to="/makeup" className="hover:text-pink-600 transition">Makeup</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-pink-600 transition">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/contact" className="hover:text-pink-600 transition">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-pink-600 transition">Shipping & Returns</Link></li>
              <li><Link to="/order-tracking" className="hover:text-pink-600 transition">Order Tracking</Link></li>
              <li><Link to="/contact" className="hover:text-pink-600 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif font-bold text-gray-900 mb-6">Stay in the Loop</h4>
            <p className="text-sm text-gray-500 mb-4">Subscribe for exclusive offers and beauty tips.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-gray-50 px-4 py-2 rounded-l-full border border-gray-200 focus:outline-none focus:border-pink-300 text-sm"
              />
              <button className="bg-gray-900 text-white px-4 py-2 rounded-r-full hover:bg-gray-800 transition">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2024 Bloom Beauty. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;