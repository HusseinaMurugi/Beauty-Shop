import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ProductCard from '../ProductCard';
import cartSlice from '../../cart/cartSlice';
import wishlistSlice from '../../wishlist/wishlistSlice';
import authSlice from '../../auth/authSlice';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  category: 'Skincare',
  price: 5000,
  image: 'https://example.com/image.jpg'
};

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartSlice,
      wishlist: wishlistSlice,
      auth: authSlice
    },
    preloadedState: {
      auth: { isAuthenticated: true },
      wishlist: { items: [] },
      cart: { items: [] },
      ...initialState
    }
  });
};

const renderWithProviders = (component, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ProductCard', () => {
  test('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Skincare')).toBeInTheDocument();
    expect(screen.getByText('Kshs. 5,000')).toBeInTheDocument();
  });

  test('adds product to cart when Add button is clicked', () => {
    const store = createMockStore();
    renderWithProviders(<ProductCard product={mockProduct} />, store);
    
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
    
    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].id).toBe(mockProduct.id);
  });

  test('toggles wishlist when heart button is clicked', () => {
    const store = createMockStore();
    renderWithProviders(<ProductCard product={mockProduct} />, store);
    
    const wishlistButton = screen.getByRole('button', { name: '' });
    fireEvent.click(wishlistButton);
    
    const state = store.getState();
    expect(state.wishlist.items).toHaveLength(1);
    expect(state.wishlist.items[0].id).toBe(mockProduct.id);
  });
});