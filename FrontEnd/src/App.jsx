import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/Toast';
import { hideNotification } from './features/cart/cartSlice';
import { hideWishlistNotification } from './features/wishlist/wishlistSlice';

function App() {
  const dispatch = useDispatch();
  const { notification: cartNotification } = useSelector((state) => state.cart);
  const { notification: wishlistNotification } = useSelector((state) => state.wishlist);

  const handleCloseCartToast = () => {
    dispatch(hideNotification());
  };

  const handleCloseWishlistToast = () => {
    dispatch(hideWishlistNotification());
  };

  return (
    <div className="App">
      <AppRoutes />
      <Toast 
        message={cartNotification.message}
        isVisible={cartNotification.isVisible}
        onClose={handleCloseCartToast}
      />
      <Toast 
        message={wishlistNotification.message}
        isVisible={wishlistNotification.isVisible}
        onClose={handleCloseWishlistToast}
      />
    </div>
  );
}

export default App;
