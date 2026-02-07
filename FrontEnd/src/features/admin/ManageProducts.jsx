import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, Package, 
  Star, DollarSign, MoreVertical 
} from 'lucide-react';
import { products } from '../../services/fakeData';

const ManageProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['all', 'Skincare', 'Haircare', 'Makeup'];
  
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'rating': return b.rating - a.rating;
        case 'stock': return b.stock - a.stock;
        default: return a.name.localeCompare(b.name);
      }
    });

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log('Deleting product:', selectedProduct);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Product Management</h1>
          <p className="text-gray-500">Manage your product catalog</p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
            <option value="stock">Sort by Stock</option>
          </select>

          {/* Results count */}
          <div className="flex items-center text-sm text-gray-500">
            <Package size={16} className="mr-2" />
            {filteredProducts.length} products
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Product Image */}
            <div className="relative aspect-[4/3] bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </span>
              )}
              <div className="absolute top-3 right-3">
                <div className="relative">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                    <MoreVertical size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-current" />
                  <span>{product.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign size={12} />
                  <span>Kshs. {product.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Package size={12} />
                  <span>{product.stock} left</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                <div className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                  product.stock > 20 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock > 5 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 20 ? 'In Stock' : product.stock > 5 ? 'Low Stock' : 'Very Low'}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  to={`/admin/products/edit/${product.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <Edit size={14} />
                  Edit
                </Link>
                <Link
                  to={`/product/${product.id}`}
                  className="flex items-center justify-center px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Eye size={14} />
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product)}
                  className="flex items-center justify-center px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-50 to-white bg-opacity-95 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <Trash2 size={20} className="text-pink-600" />
              </div>
              <h3 className="text-lg font-serif text-gray-900">Delete Product</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;