import { addItemToCart, removeItemFromCart, deleteItem, clearCart } from '../cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../cartSlice';

const createTestStore = () => {
  return configureStore({
    reducer: { cart: cartReducer }
  });
};

describe('cartSlice', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 5000,
    image: 'test.jpg'
  };

  test('should add item to cart', () => {
    const store = createTestStore();
    store.dispatch(addItemToCart(mockProduct));
    
    const state = store.getState().cart;
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(mockProduct.id);
  });

  test('should remove item from cart', () => {
    const store = createTestStore();
    store.dispatch(addItemToCart(mockProduct));
    store.dispatch(removeItemFromCart(mockProduct.id));
    
    const state = store.getState().cart;
    expect(state.items).toHaveLength(0);
  });

  test('should delete entire item from cart', () => {
    const store = createTestStore();
    store.dispatch(addItemToCart(mockProduct));
    store.dispatch(addItemToCart(mockProduct));
    store.dispatch(deleteItem(mockProduct.id));
    
    const state = store.getState().cart;
    expect(state.items).toHaveLength(0);
  });

  test('should clear cart', () => {
    const store = createTestStore();
    store.dispatch(addItemToCart(mockProduct));
    store.dispatch(clearCart());
    
    const state = store.getState().cart;
    expect(state.items).toHaveLength(0);
  });
});