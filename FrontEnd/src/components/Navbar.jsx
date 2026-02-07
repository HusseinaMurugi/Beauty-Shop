import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { products } from '../services/fakeData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setShowSearch(false);
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setShowSearch(false);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

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
            <Link to="/new-arrivals" className="text-sm font-medium hover:text-pink-600 transition-colors">NEW ARRIVALS</Link>
            <Link to="/about" className="text-sm font-medium hover:text-pink-600 transition-colors">ABOUT</Link>
            <Link to="/shop" className="text-sm font-medium hover:text-pink-600 transition-colors">SHOP ALL</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="hover:text-pink-600 transition-colors"
            >
              <Search size={20} />
            </button>
            
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

      {/* Search Bar */}
      {showSearch && (
        <div className="bg-white border-t border-gray-100 px-6 py-4">
          <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                autoFocus
              />
            </div>
            
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-50">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-0"
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category} • Kshs. {product.price.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0">
          <div className="px-6 py-4 space-y-4 flex flex-col">
            <Link to="/skincare" onClick={() => setIsOpen(false)} className="text-sm font-medium">SKINCARE</Link>
            <Link to="/haircare" onClick={() => setIsOpen(false)} className="text-sm font-medium">HAIRCARE</Link>
            <Link to="/makeup" onClick={() => setIsOpen(false)} className="text-sm font-medium">MAKEUP</Link>
            <Link to="/new-arrivals" onClick={() => setIsOpen(false)} className="text-sm font-medium">NEW ARRIVALS</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-sm font-medium">ABOUT</Link>
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