import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCart, removeItemFromCart, deleteItem } from './cartSlice';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-serif text-gray-900 mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="text-pink-600 font-bold hover:underline">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 p-4 border border-gray-100 rounded-xl bg-white items-center">
              <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-serif text-lg text-gray-900">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-2">Kshs. {item.price.toLocaleString()}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 space-x-3">
                    <button onClick={() => dispatch(removeItemFromCart(item.id))} className="text-gray-500 hover:text-gray-900"><Minus size={14}/></button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => dispatch(addItemToCart(item))} className="text-gray-500 hover:text-gray-900"><Plus size={14}/></button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg mb-2">Kshs. {item.totalPrice.toLocaleString()}</p>
                <button onClick={() => dispatch(deleteItem(item.id))} className="text-red-400 hover:text-red-600 p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 rounded-2xl sticky top-24">
            <h3 className="font-serif text-xl mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Kshs. {totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-xl mb-8">
              <span>Total</span>
              <span>Kshs. {totalAmount.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-gray-900 text-white py-4 rounded-full font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;