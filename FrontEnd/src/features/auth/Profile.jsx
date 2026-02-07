import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Package, Settings, LogOut, Edit3, Save, X } from 'lucide-react';
import { logout, updateProfile } from './authSlice';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  // Mock order history - only show for existing users, empty for new signups
  const orderHistory = user?.id === 1 ? [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 124.00,
      status: 'Delivered',
      items: [
        { name: 'Radiance Vitamin C Serum', price: 48.00, quantity: 1 },
        { name: 'Hydra-Boost Moisturizer', price: 56.00, quantity: 1 },
        { name: 'Velvet Matte Lipstick', price: 20.00, quantity: 1 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-08',
      total: 68.00,
      status: 'Processing',
      items: [
        { name: 'Argan Repair Hair Oil', price: 36.00, quantity: 1 },
        { name: 'Velvet Matte Lipstick', price: 32.00, quantity: 1 }
      ]
    }
  ] : []; // Empty array for new users

  // Update editData when user changes (for new signups)
  React.useEffect(() => {
    if (user) {
      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleDeleteAccount = () => {
    dispatch(logout());
    dispatch({ type: 'cart/clearCart' });
    dispatch({ type: 'wishlist/clearWishlist' });
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch({ type: 'cart/clearCart' });
    dispatch({ type: 'wishlist/clearWishlist' });
    navigate('/');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateProfile(editData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-500">Manage your account and view your beauty journey</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            
            {/* Avatar */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-pink-600" />
              </div>
              <h3 className="text-xl font-serif text-gray-900">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-gray-500 text-sm">Beauty Enthusiast</p>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-900">Personal Information</h4>
                {!isEditing ? (
                  <button onClick={handleEdit} className="text-pink-600 hover:text-pink-700">
                    <Edit3 size={16} />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="text-green-600 hover:text-green-700">
                      <Save size={16} />
                    </button>
                    <button onClick={handleCancel} className="text-gray-600 hover:text-gray-700">
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="flex items-center gap-3">
                <User size={16} className="text-gray-400" />
                {isEditing ? (
                  <div className="flex gap-2 flex-1">
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName}
                      onChange={handleChange}
                      className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 min-w-0"
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleChange}
                      className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 min-w-0"
                      placeholder="Last name"
                    />
                  </div>
                ) : (
                  <span className="text-gray-700">{user?.firstName} {user?.lastName}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gray-400" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2"
                  />
                ) : (
                  <span className="text-gray-700">{user?.email}</span>
                )}
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gray-400" />
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2"
                  />
                ) : (
                  <span className="text-gray-700">{user?.phone}</span>
                )}
              </div>

              {/* Address */}
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={editData.address}
                    onChange={handleChange}
                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Your address"
                  />
                ) : (
                  <span className="text-gray-700">{user?.address || 'Add your address'}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order History & Settings */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Order History */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Package size={20} className="text-pink-600" />
              <h3 className="text-xl font-serif text-gray-900">Order History</h3>
            </div>

            {orderHistory.length > 0 ? (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">Order #{order.id}</h4>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">Kshs. {order.total.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name} x{item.quantity}</span>
                          <span className="text-gray-900">Kshs. {item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No orders yet. Start shopping to see your purchase history!</p>
              </div>
            )}
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Settings size={20} className="text-pink-600" />
              <h3 className="text-xl font-serif text-gray-900">Account Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive updates about orders and promotions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                  <p className="text-sm text-gray-500">Get text updates for order status</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your profile? This action cannot be undone and you will lose all your data including order history."
      />
    </div>
  );
};

export default Profile;