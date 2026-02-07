import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Eye, Package, Truck, CheckCircle, 
  Clock, DollarSign, User, Calendar, Download, FileText 
} from 'lucide-react';

const ManageOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      customer: { name: 'Sarah Johnson', email: 'sarah@example.com' },
      date: '2024-01-20',
      total: 16120.00,
      status: 'Processing',
      items: [
        { name: 'Radiance Vitamin C Serum', quantity: 1, price: 6240.00 },
        { name: 'Hydra-Boost Moisturizer', quantity: 1, price: 7280.00 },
        { name: 'Velvet Matte Lipstick', quantity: 1, price: 2600.00 }
      ],
      paymentMethod: 'M-Pesa',
      shippingAddress: '123 Beauty Lane, Nairobi'
    },
    {
      id: 'ORD-002',
      customer: { name: 'Mike Chen', email: 'mike@example.com' },
      date: '2024-01-19',
      total: 11635.00,
      status: 'Shipped',
      items: [
        { name: 'Argan Repair Hair Oil', quantity: 1, price: 4680.00 },
        { name: 'Sunshield SPF 50 Sunscreen', quantity: 1, price: 3770.00 },
        { name: 'Volume Boost Shampoo', quantity: 1, price: 3185.00 }
      ],
      paymentMethod: 'Card',
      shippingAddress: '456 Glow Street, Mombasa'
    },
    {
      id: 'ORD-003',
      customer: { name: 'Emma Davis', email: 'emma@example.com' },
      date: '2024-01-18',
      total: 20378.00,
      status: 'Delivered',
      items: [
        { name: 'Radiance Vitamin C Serum', quantity: 2, price: 12480.00 },
        { name: 'Velvet Matte Lipstick', quantity: 2, price: 7898.00 }
      ],
      paymentMethod: 'M-Pesa',
      shippingAddress: '789 Beauty Boulevard, Kisumu'
    }
  ];

  const statusOptions = ['all', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock size={16} className="text-yellow-600" />;
      case 'Shipped': return <Truck size={16} className="text-blue-600" />;
      case 'Delivered': return <CheckCircle size={16} className="text-green-600" />;
      default: return <Package size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    // Handle status update logic here
  };

  const exportOrders = () => {
    const csvContent = [
      ['Order ID', 'Customer', 'Email', 'Date', 'Total', 'Status', 'Payment Method'],
      ...filteredOrders.map(order => [
        order.id,
        order.customer.name,
        order.customer.email,
        order.date,
        `Kshs. ${order.total.toLocaleString()}`,
        order.status,
        order.paymentMethod
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const viewOrderDetails = (order) => {
    navigate(`/admin/orders/${order.id}`);
  };

  const generateInvoice = (order) => {
    // Generate and download invoice
    const invoiceContent = `
INVOICE

Order ID: ${order.id}
Customer: ${order.customer.name}
Email: ${order.customer.email}
Date: ${order.date}

Items:
${order.items.map(item => `${item.name} x${item.quantity} - Kshs. ${item.price.toLocaleString()}`).join('\n')}

Total: Kshs. ${order.total.toLocaleString()}
Payment Method: ${order.paymentMethod}
Shipping Address: ${order.shippingAddress}
    `;
    
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Order Management</h1>
          <p className="text-gray-500">Track and manage customer orders</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportOrders}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <Download size={18} />
            Export Orders
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search orders or customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status}
              </option>
            ))}
          </select>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          {/* Results count */}
          <div className="flex items-center text-sm text-gray-500">
            <Package size={16} className="mr-2" />
            {filteredOrders.length} orders
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            
            {/* Order Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">{order.id}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{order.customer.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{order.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} />
                      <span>Kshs. {order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Kshs. {item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer & Shipping Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Customer Details</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <span className="ml-2 text-gray-900">{order.customer.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Payment:</span>
                    <span className="ml-2 text-gray-900">{order.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Shipping:</span>
                    <span className="ml-2 text-gray-900">{order.shippingAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => generateInvoice(order)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <FileText size={16} />
                Generate Invoice
              </button>
              <button 
                onClick={() => viewOrderDetails(order)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Eye size={16} />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Package size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;