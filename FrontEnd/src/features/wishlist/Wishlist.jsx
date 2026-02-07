import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { removeFromWishlist } from './wishlistSlice';
import { addItemToCart } from '../cart/cartSlice';

const Wishlist = () => {
  const { items } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addItemToCart(product));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-500">Items you've saved for later</p>
      </div>

      {items.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-50">
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                >
                  <Heart size={16} className="text-red-500 fill-current" />
                </button>
              </div>

              <div className="p-5 text-center">
                <h3 className="font-serif text-lg text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{product.category}</p>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-gray-900">Kshs. {product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    Add <ShoppingCart size={12}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Heart size={64} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-serif text-gray-400 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-400 mb-6">Start adding items you love!</p>
          <button 
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;