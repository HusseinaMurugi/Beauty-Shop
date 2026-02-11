import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  LayoutDashboard, Package, Users, ShoppingCart, BarChart3, 
  Settings, LogOut, Menu, X, FileText, UserCheck, AlertTriangle, MessageSquare 
} from 'lucide-react';
import { logout } from '../features/auth/authSlice';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleReturnToShop = () => {
    setPassword('');
    setPasswordError('');
    setShowLogoutModal(true);
  };

  const handleSignOut = () => {
    setPassword('');
    setPasswordError('');
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Validate password (hardcoded for now since bcrypt is broken)
    if (user?.email === 'admin@gmail.com' && password === 'admin123') {
      dispatch(logout());
      dispatch({ type: 'cart/clearCart' });
      dispatch({ type: 'wishlist/clearWishlist' });
      navigate('/');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Support', href: '/admin/support', icon: MessageSquare },
    { name: 'Analytics & Reports', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Roles', href: '/admin/roles', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link to="/admin" className="text-xl font-serif font-bold text-gray-900">
            Bloom Beauty<span className="text-pink-600">.</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Admin info */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/admin/profile" className="flex items-center hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
              <Users size={20} className="text-pink-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-500">Admin Profile</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 flex-1">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'bg-pink-50 text-pink-600 border border-pink-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={18} className="mr-4 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-3">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors"
          >
            <LogOut size={18} className="mr-4 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleReturnToShop}
                className="text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                ← Back to Store
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle size={20} className="text-yellow-600" />
              </div>
              <h3 className="text-lg font-serif text-gray-900">Confirm Logout</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Please enter your password to confirm logout and return to the shop.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter your password"
                onKeyPress={(e) => e.key === 'Enter' && confirmLogout()}
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  setPassword('');
                  setPasswordError('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;