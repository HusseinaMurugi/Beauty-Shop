import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex items-center gap-3 max-w-sm">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <Check size={16} className="text-green-600" />
        </div>
        <span className="text-gray-700 text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;