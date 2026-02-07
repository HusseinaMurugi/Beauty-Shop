import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { products } from '../../services/fakeData'; 
import { addItemToCart } from '../cart/cartSlice';
import { Star, Truck, ShieldCheck, Minus, Plus, ShoppingBag, Heart, User } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  // Find product
  const product = products.find(p => p.id === parseInt(id));

  // State Management
  const [qty, setQty] = useState(1);
  const [isLiked, setIsLiked] = useState(false); // Like state
  
  // Reviews State
  // We initialize with the fake reviews from data, or empty array if none exist
  const [reviews, setReviews] = useState(product?.reviewsList || []);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", name: "" });
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) return <div className="p-20 text-center text-red-500">Product not found</div>;

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowReviewForm(!showReviewForm);
  };

  const handleAddToCart = () => {
    for(let i=0; i<qty; i++) {
        dispatch(addItemToCart(product));
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.comment) return;

    const reviewToAdd = {
      id: Date.now(), // Generate fake ID
      user: newReview.name || "Anonymous Customer",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    };

    setReviews([reviewToAdd, ...reviews]); // Add to top of list
    setNewReview({ rating: 5, comment: "", name: "" }); // Reset form
    setShowReviewForm(false); // Close form
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-900 mb-8">
        &larr; Back to Shop
      </button>

      {/* --- TOP SECTION: Product Info --- */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square relative group">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          
          {/* Like Button (Floating on Image for Style) */}
          <button 
            onClick={toggleLike}
            className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
             <Heart 
               size={24} 
               className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} 
             />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <span className="text-pink-600 font-bold uppercase tracking-widest text-xs">{product.category}</span>
            <h1 className="text-4xl font-serif text-gray-900 mt-2 mb-4">{product.name}</h1>
            
            {/* Rating Summary */}
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i >= Math.floor(product.rating) ? "text-gray-300" : ""} />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} / 5.0 ({reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900">Kshs. {product.price.toLocaleString()}</div>

          <p className="text-gray-600 leading-relaxed">
            {product.description} Experience the ultimate in luxury. Formulated with premium ingredients to revitalize and protect, ensuring you look your best every single day.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 space-x-4">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16}/></button>
              <span className="font-bold w-4 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)}><Plus size={16}/></button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} /> Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2"><Truck size={16} /> Free Delivery</div>
            <div className="flex items-center gap-2"><ShieldCheck size={16} /> Secure Transaction</div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: Reviews & Community --- */}
      <div className="border-t border-gray-100 pt-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-serif text-gray-900">Customer Reviews</h2>
          <button 
            onClick={handleWriteReview}
            className="text-pink-600 font-bold border border-pink-200 px-6 py-2 rounded-full hover:bg-pink-50 transition"
          >
            {showReviewForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left: Review Form (Conditional) or Stats */}
          <div className="lg:col-span-1">
             {showReviewForm ? (
               <div className="bg-gray-50 p-6 rounded-2xl animate-fade-in-up">
                 <h3 className="font-bold mb-4">Share your thoughts</h3>
                 <form onSubmit={handleSubmitReview} className="space-y-4">
                   <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">Your Name</label>
                     <input 
                        className="w-full p-2 border border-gray-200 rounded-lg"
                        placeholder="e.g. Jane Doe"
                        value={newReview.name}
                        onChange={e => setNewReview({...newReview, name: e.target.value})}
                     />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">Rating</label>
                     <div className="flex gap-2 text-gray-300">
                       {[1,2,3,4,5].map(star => (
                         <button 
                           key={star} 
                           type="button"
                           onClick={() => setNewReview({...newReview, rating: star})}
                           className={star <= newReview.rating ? "text-yellow-400" : "hover:text-yellow-400"}
                         >
                           <Star size={24} fill="currentColor" />
                         </button>
                       ))}
                     </div>
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">Review</label>
                     <textarea 
                        required
                        className="w-full p-2 border border-gray-200 rounded-lg h-24"
                        placeholder="What did you like or dislike?"
                        value={newReview.comment}
                        onChange={e => setNewReview({...newReview, comment: e.target.value})}
                     />
                   </div>
                   <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold">
                     Submit Review
                   </button>
                 </form>
               </div>
             ) : (
               <div className="bg-pink-50/50 p-8 rounded-2xl text-center">
                 <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating}</div>
                 <div className="flex justify-center text-yellow-400 mb-4">
                    <Star fill="currentColor" size={24} />
                    <Star fill="currentColor" size={24} />
                    <Star fill="currentColor" size={24} />
                    <Star fill="currentColor" size={24} />
                    <Star fill="currentColor" size={24} />
                 </div>
                 <p className="text-gray-500">Based on {reviews.length} reviews</p>
               </div>
             )}
          </div>

          {/* Right: Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.length === 0 ? (
              <p className="text-gray-400 text-center py-10 italic">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{review.user}</h4>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-200" : ""} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed pl-14">
                    {review.comment}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;