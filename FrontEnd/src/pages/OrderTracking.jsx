import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderTracking = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Mock order data
  const mockOrders = {
    'ORD-001': {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 124.00,
      items: ['Radiance Vitamin C Serum', 'Hydra-Boost Moisturizer'],
      tracking: 'BL123456789',
      steps: [
        { status: 'ordered', label: 'Order Placed', date: '2024-01-15', completed: true },
        { status: 'processing', label: 'Processing', date: '2024-01-16', completed: true },
        { status: 'shipped', label: 'Shipped', date: '2024-01-17', completed: true },
        { status: 'delivered', label: 'Delivered', date: '2024-01-18', completed: true }
      ]
    },
    'ORD-002': {
      id: 'ORD-002',
      date: '2024-01-20',
      status: 'shipped',
      total: 68.00,
      items: ['Argan Repair Hair Oil', 'Velvet Matte Lipstick'],
      tracking: 'BL987654321',
      steps: [
        { status: 'ordered', label: 'Order Placed', date: '2024-01-20', completed: true },
        { status: 'processing', label: 'Processing', date: '2024-01-21', completed: true },
        { status: 'shipped', label: 'Shipped', date: '2024-01-22', completed: true },
        { status: 'delivered', label: 'Out for Delivery', date: 'Expected today', completed: false }
      ]
    }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingNumber) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const order = mockOrders[trackingNumber.toUpperCase()];
      setOrderData(order || null);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status, completed) => {
    if (completed) {
      return <CheckCircle size={24} className="text-green-600" />;
    } else if (status === 'delivered') {
      return <Clock size={24} className="text-gray-400" />;
    } else {
      return <Package size={24} className="text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif text-gray-900 mb-4">Track Your Order</h1>
        <p className="text-gray-500">Enter your order number to see the latest updates</p>
      </div>

      {/* Tracking Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
        <form onSubmit={handleTrack} className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter order number (e.g., ORD-001)"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>
      </div>

      {/* Order Results */}
      {orderData ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          
          {/* Order Header */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-serif text-gray-900 mb-2">Order {orderData.id}</h2>
              <p className="text-gray-500">Placed on {orderData.date}</p>
              <p className="text-gray-500">Tracking: {orderData.tracking}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">Kshs. {orderData.total.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{orderData.items.length} items</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <h3 className="font-medium text-gray-900 mb-6">Order Progress</h3>
            <div className="space-y-6">
              {orderData.steps.map((step, index) => (
                <div key={step.status} className="relative flex items-start">
                  
                  {/* Connecting Line */}
                  {index < orderData.steps.length - 1 && (
                    <div className={`absolute left-3 top-6 w-0.5 h-12 ${
                      step.completed ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                  
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0 mr-4">
                    {getStatusIcon(step.status, step.completed)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-medium ${
                        step.completed ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </h4>
                      <span className={`text-sm flex-shrink-0 ml-4 ${
                        step.completed ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.date}
                      </span>
                    </div>
                    {step.status === 'shipped' && step.completed && (
                      <p className="text-sm text-gray-500 mt-1">
                        Your order is on its way! Expected delivery in 1-2 business days.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Items in this order</h3>
            <div className="space-y-3">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-gray-700">{item}</span>
                  <span className="text-gray-500">1x</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="border-t border-gray-100 pt-6 mt-6">
            <p className="text-gray-600 text-center">
              Need help with your order?{' '}
              <Link to="/contact" className="text-pink-600 hover:text-pink-700 font-medium">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      ) : trackingNumber && !isLoading ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
          <Package size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Order Not Found</h3>
          <p className="text-gray-500 mb-4">
            We couldn't find an order with that number. Please check and try again.
          </p>
          <p className="text-sm text-gray-400">
            Try: ORD-001 or ORD-002 for demo orders
          </p>
        </div>
      ) : null}

      {/* Help Section */}
      {!orderData && (
        <div className="bg-pink-50 rounded-2xl p-8 text-center">
          <Truck size={48} className="mx-auto mb-4 text-pink-600" />
          <h3 className="text-lg font-serif text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Can't find your order number? Check your email confirmation or visit your profile.
          </p>
          <Link 
            to="/contact" 
            className="inline-block px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;