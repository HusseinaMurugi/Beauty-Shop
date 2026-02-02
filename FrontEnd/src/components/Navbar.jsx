import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold tracking-tighter">
            Bloom Beauty<span className="text-pink-600">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-pink-600 transition-colors">HOME</Link>
            <Link to="/skincare" className="text-sm font-medium hover:text-pink-600 transition-colors">SKINCARE</Link>
            <Link to="/haircare" className="text-sm font-medium hover:text-pink-600 transition-colors">HAIRCARE</Link>
            <Link to="/makeup" className="text-sm font-medium hover:text-pink-600 transition-colors">MAKEUP</Link>
            <Link to="/shop" className="text-sm font-medium hover:text-pink-600 transition-colors">SHOP ALL</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="hover:text-pink-600 transition-colors"><Search size={20} /></button>
            
            <button onClick={() => navigate('/wishlist')} className="relative hover:text-pink-600 transition-colors">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            
            <button onClick={() => navigate('/cart')} className="relative hover:text-pink-600 transition-colors">
              <ShoppingBag size={20} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </button>
            
            <button onClick={() => navigate(isAuthenticated ? '/profile' : '/login')} className="hidden md:block hover:text-pink-600 transition-colors">
              <User size={20} />
            </button>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0">
          <div className="px-6 py-4 space-y-4 flex flex-col">
            <Link to="/skincare" onClick={() => setIsOpen(false)} className="text-sm font-medium">SKINCARE</Link>
            <Link to="/haircare" onClick={() => setIsOpen(false)} className="text-sm font-medium">HAIRCARE</Link>
            <Link to="/makeup" onClick={() => setIsOpen(false)} className="text-sm font-medium">MAKEUP</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="text-sm font-medium">SHOP ALL</Link>
            <Link to="/wishlist" onClick={() => setIsOpen(false)} className="text-sm font-medium">WISHLIST</Link>
            <hr className="border-gray-200" />
            {isAuthenticated ? (
              <Link to="/profile" onClick={() => setIsOpen(false)} className="text-sm font-medium text-pink-600">
                {user?.firstName}'s PROFILE
              </Link>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-medium text-pink-600">LOGIN</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;