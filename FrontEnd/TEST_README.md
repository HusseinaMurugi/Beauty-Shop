# Beauty Shop Frontend Tests

## Overview
This test suite ensures the Beauty Shop frontend application works correctly before deployment.

## Test Structure

### Unit Tests
- **ProductCard Tests**: Verify product display and interactions
- **Cart Slice Tests**: Validate cart operations (add, remove, update, clear)
- **Auth Slice Tests**: Verify authentication logic (login, logout, register)
- **Notification Tests**: Test notification component rendering and behavior

### Integration Tests
- **Currency Tests**: Ensure all prices are in Kenyan Shillings (KES)
- **Role Management Tests**: Verify only admin and customer roles are available
- **Service Tests**: Validate data service functions

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

## Test Coverage Areas

1. **Product Management**
   - Product display with correct KES pricing
   - Add to cart functionality
   - Wishlist toggle

2. **Shopping Cart**
   - Add items to cart
   - Remove items from cart
   - Update quantities
   - Clear cart
   - Calculate totals in KES

3. **Authentication**
   - User login
   - User logout
   - User registration
   - Session management

4. **Admin Features**
   - Role restrictions (admin and customer only)
   - Product management
   - User management

5. **Currency**
   - All prices in Kenyan Shillings
   - No USD references
   - Correct price formatting

## Pre-Launch Checklist

Before launching the application, ensure:
- [ ] All tests pass (`npm test`)
- [ ] No console errors
- [ ] Currency displays as KES throughout
- [ ] Only admin and customer roles available
- [ ] Cart operations work correctly
- [ ] Authentication flows work
- [ ] Product data is valid

## Continuous Integration

These tests should be run automatically before:
- Merging pull requests
- Deploying to staging
- Deploying to production

## Adding New Tests

When adding new features, create corresponding tests in:
- `src/features/[feature]/__tests__/` for feature-specific tests
- `src/components/__tests__/` for component tests
- `src/__tests__/` for integration tests