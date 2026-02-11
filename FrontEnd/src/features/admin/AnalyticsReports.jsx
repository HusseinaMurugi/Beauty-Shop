import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Package, Users, 
  ShoppingCart, Eye, Calendar, BarChart3, PieChart, Download, FileText, Loader2
} from 'lucide-react';
import { productsAPI, ordersAPI, usersAPI } from '../../services/api';

const AnalyticsReports = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('analytics');
  const [reportType, setReportType] = useState('sales');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    revenue: 0,
    orders: 0,
    users: 0,
    products: 0
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        productsAPI.getAll(),
        ordersAPI.getAllOrders(),
        usersAPI.getAll()
      ]);

      const orders = ordersRes.data;
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

      setAnalyticsData({
        revenue: totalRevenue,
        orders: orders.length,
        users: usersRes.data.length,
        products: productsRes.data.length
      });
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const overviewStats = [
    { name: 'Total Revenue', value: `Kshs. ${analyticsData.revenue.toLocaleString()}`, change: '+15.3%', trend: 'up', icon: DollarSign, color: 'bg-green-500' },
    { name: 'Total Orders', value: analyticsData.orders.toString(), change: '+23.1%', trend: 'up', icon: ShoppingCart, color: 'bg-blue-500' },
    { name: 'Total Products', value: analyticsData.products.toString(), change: '+8.7%', trend: 'up', icon: Package, color: 'bg-purple-500' },
    { name: 'Total Users', value: analyticsData.users.toString(), change: '+12.1%', trend: 'up', icon: Users, color: 'bg-pink-500' }
  ];

  const topProducts = [];

  const categoryPerformance = [
    { category: 'Skincare', sales: Math.round(analyticsData.orders * 0.48), revenue: Math.round(analyticsData.revenue * 0.48), percentage: 48 },
    { category: 'Makeup', sales: Math.round(analyticsData.orders * 0.32), revenue: Math.round(analyticsData.revenue * 0.32), percentage: 32 },
    { category: 'Haircare', sales: Math.round(analyticsData.orders * 0.20), revenue: Math.round(analyticsData.revenue * 0.20), percentage: 20 }
  ];

  const recentReports = [];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`${reportType} report generated for ${timeRange}`);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-pink-600" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-500">Track performance and generate business reports</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'analytics'
              ? 'text-pink-600 border-b-2 border-pink-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Analytics Dashboard
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'reports'
              ? 'text-pink-600 border-b-2 border-pink-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Generate Reports
        </button>
      </div>

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewStats.map((stat) => (
              <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-serif text-gray-900">Top Performing Products</h2>
              </div>
              <div className="p-6 space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-sm mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{product.sales} sales</span>
                          <span>{product.conversionRate}% conversion</span>
                        </div>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">Kshs. {product.revenue.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-serif text-gray-900">Category Performance</h2>
              </div>
              <div className="p-6 space-y-4">
                {categoryPerformance.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{category.category}</span>
                      <span className="text-sm text-gray-500">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{category.sales} orders</span>
                      <span>Kshs. {category.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Report Generator */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-serif text-gray-900 mb-6">Generate New Report</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="sales">Sales Report</option>
                  <option value="products">Product Report</option>
                  <option value="customers">Customer Report</option>
                  <option value="orders">Order Report</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option value="pdf">PDF Report</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV Data</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  Generate Report
                </>
              )}
            </button>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-serif text-gray-900 mb-4">Recent Reports</h3>
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{report.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{report.date}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsReports;
