import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Notification from '../components/Notification';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [notification, setNotification] = useState({ isVisible: false, message: '', type: 'info' });
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = (message, type = 'info') => {
    setNotification({ isVisible: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      showNotification('Thank you for contacting us! We\'ll get back to you within 24 hours.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Notification 
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          We're here to help! Reach out to us for any questions about orders, products, shipping, or returns.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-serif text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Email Support</h3>
                  <p className="text-gray-600">support@bloombeauty.com</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Phone Support</h3>
                  <p className="text-gray-600">+1 (555) 123-BLOOM</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Visit Our Store</h3>
                  <p className="text-gray-600">123 Beauty Lane<br />Glow City, GC 12345</p>
                  <p className="text-sm text-gray-500">Open daily 10AM-8PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-gray-600">Saturday - Sunday: 10AM - 4PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-pink-50 p-6 rounded-2xl">
            <h3 className="font-serif text-lg text-gray-900 mb-4">Quick Help</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900">Shipping & Returns</p>
                <p className="text-gray-600">Free shipping on orders over Kshs. 6,500. 30-day return policy.</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Order Tracking</p>
                <p className="text-gray-600">Track your order status in your profile or contact us.</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Product Questions</p>
                <p className="text-gray-600">Need help choosing? Our beauty experts are here to help!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              >
                <option value="">Select a topic</option>
                <option value="order">Order Support</option>
                <option value="shipping">Shipping & Returns</option>
                <option value="product">Product Questions</option>
                <option value="account">Account Issues</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                placeholder="How can we help you?"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? 'Sending...' : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;