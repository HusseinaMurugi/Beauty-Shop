import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  notification: {
    isVisible: false,
    message: ''
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (!existingItem) {
        state.items.push(product);
        state.notification = {
          isVisible: true,
          message: 'Added to wishlist'
        };
      }
    },
    removeFromWishlist(state, action) {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      state.notification = {
        isVisible: true,
        message: 'Removed from wishlist'
      };
    },
    hideWishlistNotification(state) {
      state.notification.isVisible = false;
    },
    clearWishlist(state) {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase('auth/logout', (state) => {
      state.items = [];
    });
  },
});

export const { addToWishlist, removeFromWishlist, hideWishlistNotification } = wishlistSlice.actions;
export default wishlistSlice.reducer;