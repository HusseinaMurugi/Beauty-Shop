import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ProductCard from '../features/products/ProductCard';
import { products } from '../services/fakeData';

const NewArrivals = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter products marked as new or take the latest ones
  const newProducts = products.filter(product => product.isNew);
  
  // Filter by category
  const filteredProducts = selectedCategory === 'All' 
    ? newProducts 
    : newProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles size={32} className="text-pink-600" />
          <h1 className="text-4xl font-serif text-gray-900">New Arrivals</h1>
          <Sparkles size={32} className="text-pink-600" />
        </div>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover our latest beauty innovations. Fresh products, trending formulas, and exclusive collections just for you.
        </p>
      </div>

      {/* Featured New Product */}
      {newProducts.length > 0 && (
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                JUST LAUNCHED
              </span>
              <h2 className="text-3xl font-serif text-gray-900 mb-4">
                {newProducts[0].name}
              </h2>
              <p className="text-gray-600 mb-6">
                {newProducts[0].description} Experience the latest in beauty innovation with our newest formula.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-900">
                  Kshs. {newProducts[0].price.toLocaleString()}
                </span>
                <button className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={newProducts[0].image} 
                alt={newProducts[0].name}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-pink-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm">
                NEW
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All New Products Grid */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif text-gray-900">Latest Additions</h2>
          <div className="flex gap-2">
            {['All', 'Skincare', 'Makeup', 'Haircare'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setSelectedCategory(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === filter
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <div className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <Sparkles size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-serif text-gray-400 mb-2">
              {selectedCategory === 'All' ? 'No new arrivals yet' : `No new ${selectedCategory.toLowerCase()} products`}
            </h3>
            <p className="text-gray-400">Check back soon for exciting new products!</p>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-900 text-white rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-serif mb-4">Be the First to Know</h3>
        <p className="text-gray-300 mb-6 max-w-md mx-auto">
          Subscribe to get notified about new arrivals, exclusive launches, and special offers.
        </p>
        <div className="flex max-w-md mx-auto gap-3">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button className="px-6 py-3 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;