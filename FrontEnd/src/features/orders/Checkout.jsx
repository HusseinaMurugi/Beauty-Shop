import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../cart/cartSlice';
import { createOrder } from '../../services/fakeData';
import { Loader2, Phone, CreditCard } from 'lucide-react';
import Notification from '../../components/Notification';

const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [mpesaPrompted, setMpesaPrompted] = useState(false);
  const [notification, setNotification] = useState({ isVisible: false, message: '', type: 'info' });

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: '', card: ''
  });

  // Redirect if cart is empty
  if (items.length === 0) {
    React.useEffect(() => { navigate('/cart'); }, [navigate]);
    return null;
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ isVisible: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  const handleMpesaPrompt = () => {
    if (!mpesaPhone) {
      showNotification('Please enter your M-Pesa phone number', 'error');
      return;
    }
    if (mpesaPhone.length < 10) {
      showNotification('Please enter a valid phone number', 'error');
      return;
    }
    
    setMpesaPrompted(true);
    showNotification(`Payment prompt sent to ${mpesaPhone}. Please check your phone and enter your PIN.`, 'success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'mpesa' && !mpesaPrompted) {
      showNotification('Please complete M-Pesa payment first', 'error');
      return;
    }
    
    setIsProcessing(true);

    const orderPayload = {
      customer: formData,
      items: items,
      total: totalAmount,
      paymentMethod: paymentMethod,
      ...(paymentMethod === 'mpesa' && { mpesaPhone })
    };

    try {
      // 1. Call the Fake DB Service
      const newOrder = await createOrder(orderPayload);
      
      // 2. Clear Redux Cart
      dispatch(clearCart());
      
      // 3. Navigate to Invoice using the NEW generated ID
      navigate(`/invoice/${newOrder.id}`);
      
    } catch (error) {
      console.error("Checkout failed", error);
      showNotification("Something went wrong. Please try again.", 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Notification 
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      <h1 className="text-3xl font-serif text-gray-900 mb-8 text-center">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="font-bold text-lg">Shipping Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <input required name="firstName" placeholder="First Name" onChange={handleChange} className="border p-3 rounded-lg w-full" />
            <input required name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-3 rounded-lg w-full" />
          </div>
          <input required name="email" type="email" placeholder="Email Address" onChange={handleChange} className="border p-3 rounded-lg w-full" />
          <input required name="address" placeholder="Shipping Address" onChange={handleChange} className="border p-3 rounded-lg w-full" />
          <div className="grid grid-cols-2 gap-4">
            <input required name="city" placeholder="City" onChange={handleChange} className="border p-3 rounded-lg w-full" />
            <input required name="zip" placeholder="Zip Code" onChange={handleChange} className="border p-3 rounded-lg w-full" />
          </div>

          <h3 className="font-bold text-lg pt-4">Payment Method</h3>
          
          {/* Payment Method Selection */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <CreditCard size={20} className="mr-2 text-gray-600" />
                <span>Credit/Debit Card</span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mpesa"
                  checked={paymentMethod === 'mpesa'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <Phone size={20} className="mr-2 text-green-600" />
                <span>M-Pesa</span>
              </label>
            </div>

            {/* Card Payment */}
            {paymentMethod === 'card' && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Simulated Payment Gateway</p>
                <input 
                  required 
                  name="card" 
                  type="text" 
                  maxLength="19" 
                  placeholder="Card Number (XXXX XXXX XXXX XXXX)" 
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full bg-white" 
                />
              </div>
            )}

            {/* M-Pesa Payment */}
            {paymentMethod === 'mpesa' && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 mb-3 font-medium">Pay with M-Pesa</p>
                <div className="space-y-3">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="Enter M-Pesa phone number (254...)"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  {!mpesaPrompted ? (
                    <button
                      type="button"
                      onClick={handleMpesaPrompt}
                      className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Prompt Me
                    </button>
                  ) : (
                    <div className="text-center py-2">
                      <span className="text-green-700 font-medium">✓ M-Pesa prompt sent</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isProcessing}
            className="w-full bg-pink-600 text-white py-4 rounded-full font-bold hover:bg-pink-700 transition shadow-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin mr-2" /> Processing...</>
            ) : (
              `Pay Kshs. ${totalAmount.toLocaleString()}`
            )}
          </button>
        </form>

        {/* Order Preview */}
        <div className="bg-gray-50 p-8 rounded-2xl h-fit">
          <h3 className="font-serif text-lg mb-4">Your Order</h3>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                <span className="font-bold">Kshs. {item.totalPrice.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Kshs. {totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;