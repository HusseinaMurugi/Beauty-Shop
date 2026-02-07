import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../wishlist/wishlistSlice';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addItemToCart(product));
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div onClick={handleCardClick} className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-50 cursor-pointer">
      <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-pink-50 transition-colors"
        >
          <Heart 
            size={16} 
            className={`transition-colors ${
              isInWishlist 
                ? 'text-red-500 fill-current' 
                : 'text-gray-400 hover:text-red-500'
            }`} 
          />
        </button>
      </div>

      <div className="p-5 text-center">
        <h3 className="font-serif text-lg text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3">{product.category}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-lg text-gray-900">Kshs. {product.price.toLocaleString()}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Add <ShoppingCart size={12}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;