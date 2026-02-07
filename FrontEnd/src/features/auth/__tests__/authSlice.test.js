import authReducer, { loginSuccess, logout, updateProfile } from '../authSlice';

describe('authSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false
  };

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'customer'
  };

  test('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle loginSuccess', () => {
    const state = authReducer(initialState, loginSuccess(mockUser));
    
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  test('should handle logout', () => {
    const authenticatedState = {
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    };
    
    const state = authReducer(authenticatedState, logout());
    
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  test('should handle updateProfile', () => {
    const authenticatedState = {
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    };
    
    const updates = { firstName: 'Updated' };
    const state = authReducer(authenticatedState, updateProfile(updates));
    
    expect(state.user.firstName).toBe('Updated');
    expect(state.user.email).toBe(mockUser.email);
  });
});