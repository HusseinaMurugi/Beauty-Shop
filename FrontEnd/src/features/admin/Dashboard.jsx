import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, Users, ShoppingCart, DollarSign, TrendingUp, 
  Eye, Plus, FileText, AlertCircle, Loader2
} from 'lucide-react';
import { productsAPI, ordersAPI, usersAPI } from '../../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        productsAPI.getAll(),
        ordersAPI.getAllOrders(),
        usersAPI.getAll()
      ]);

      // Calculate stats
      const products = productsRes.data;
      const orders = ordersRes.data;
      const users = usersRes.data;

      const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue: totalRevenue
      });

      // Get recent orders (last 4)
      const recent = orders.slice(0, 4).map(order => {
        const customer = order.customer_json ? JSON.parse(order.customer_json) : {};
        return {
          id: order.invoice_number || order.id,
          customer: `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Unknown',
          amount: order.total_amount || 0,
          status: order.status || 'Processing',
          date: new Date(order.created_at).toLocaleDateString()
        };
      });
      setRecentOrders(recent);

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statsDisplay = [
    { name: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500' },
    { name: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'bg-green-500' },
    { name: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-purple-500' },
    { name: 'Revenue', value: `Kshs. ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-pink-500' },
  ];

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-pink-600" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus size={18} />
            Add Product
          </Link>
          <Link
            to="/admin/analytics"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <FileText size={18} />
            View Reports
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsDisplay.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-serif text-gray-900">Recent Orders</h2>
              <Link to="/admin/orders" className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">Kshs. {order.amount.toLocaleString()}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No orders yet</p>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-serif text-gray-900">Quick Stats</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-gray-600">Average Order Value</span>
                <span className="font-bold text-gray-900">
                  Kshs. {stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString() : 0}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-gray-600">Products per Category</span>
                <span className="font-bold text-gray-900">{Math.round(stats.totalProducts / 3)}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600">Active Customers</span>
                <span className="font-bold text-gray-900">{stats.totalUsers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-serif text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/products/new"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Package size={24} className="text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Product</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart size={24} className="text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Orders</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Users size={24} className="text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Manage Users</span>
          </Link>
          <Link
            to="/admin/analytics"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <TrendingUp size={24} className="text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
