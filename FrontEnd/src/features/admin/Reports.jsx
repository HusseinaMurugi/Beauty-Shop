import React, { useState } from 'react';
import { 
  Download, FileText, Calendar, Filter, TrendingUp, 
  DollarSign, Package, Users, ShoppingCart, Eye 
} from 'lucide-react';

const Reports = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('30d');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    frequency: 'weekly',
    email: '',
    time: '09:00'
  });

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: DollarSign, description: 'Revenue and sales analytics' },
    { id: 'products', name: 'Product Report', icon: Package, description: 'Product performance and inventory' },
    { id: 'customers', name: 'Customer Report', icon: Users, description: 'Customer behavior and demographics' },
    { id: 'orders', name: 'Order Report', icon: ShoppingCart, description: 'Order status and fulfillment' },
  ];

  const recentReports = [
    { name: 'Monthly Sales Report - January 2024', type: 'Sales', date: '2024-01-31', size: '2.4 MB' },
    { name: 'Product Performance Q4 2023', type: 'Products', date: '2024-01-15', size: '1.8 MB' },
    { name: 'Customer Analytics December', type: 'Customers', date: '2024-01-01', size: '3.1 MB' },
    { name: 'Order Fulfillment Report', type: 'Orders', date: '2023-12-28', size: '1.2 MB' },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Trigger download
      console.log(`Generating ${reportType} report for ${dateRange}`);
    }, 3000);
  };

  const handleScheduleReport = () => {
    console.log('Scheduling report:', { reportType, ...scheduleData });
    setShowScheduleModal(false);
    // Handle schedule logic here
  };

  const handleDownloadReport = (reportName) => {
    console.log(`Downloading: ${reportName}`);
    // Handle download logic here
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Generate and download business reports</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <Calendar size={18} />
            Schedule Report
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Report Generator */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Report Type Selection */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-serif text-gray-900 mb-6">Generate New Report</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {reportTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    reportType === type.id
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      reportType === type.id ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <type.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{type.name}</h3>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Date Range & Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                  <option value="custom">Custom range</option>
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

            {/* Generate Button */}
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  Generate Report
                </>
              )}
            </button>
          </div>

          {/* Report Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-serif text-gray-900 mb-4">Report Preview</h3>
            
            {reportType === 'sales' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                    <p className="text-sm text-green-600 font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-900">Kshs. 5,937,140</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                    <p className="text-sm text-blue-600 font-medium">Orders</p>
                    <p className="text-2xl font-bold text-blue-900">1,234</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                    <p className="text-sm text-purple-600 font-medium">Avg. Order</p>
                    <p className="text-2xl font-bold text-purple-900">Kshs. 4,813</p>
                  </div>
                </div>
              </div>
            )}

            {reportType === 'products' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl">
                    <p className="text-sm text-pink-600 font-medium">Total Products</p>
                    <p className="text-2xl font-bold text-pink-900">156</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl">
                    <p className="text-sm text-yellow-600 font-medium">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-900">8</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl">
                    <p className="text-sm text-indigo-600 font-medium">Top Seller</p>
                    <p className="text-sm font-bold text-indigo-900">Vitamin C Serum</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="space-y-6">
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
                  <button
                    onClick={() => handleDownloadReport(report.name)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-serif mb-4">Quick Insights</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Reports Generated</span>
                <span className="font-bold">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Data Exported</span>
                <span className="font-bold">12.4 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Last Export</span>
                <span className="font-bold">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-serif text-gray-900 mb-4">Schedule Report</h3>
            
            <div className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={scheduleData.frequency}
                  onChange={(e) => setScheduleData({...scheduleData, frequency: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={scheduleData.email}
                  onChange={(e) => setScheduleData({...scheduleData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter email address"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={scheduleData.time}
                  onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleReport}
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;