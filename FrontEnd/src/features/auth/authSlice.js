import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure(state) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateProfile(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;

// Action to clear all user data including cart and wishlist
export const logoutAndClearData = () => (dispatch) => {
  dispatch(logout());
  dispatch({ type: 'cart/clearCart' });
  dispatch({ type: 'wishlist/clearWishlist' });
};