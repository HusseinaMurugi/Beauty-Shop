import { products, getProductById, createOrder } from '../fakeData';

describe('fakeData service', () => {
  describe('products', () => {
    test('should have products array', () => {
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    test('each product should have required fields', () => {
      products.forEach(product => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('category');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('image');
        expect(product).toHaveProperty('description');
      });
    });

    test('product prices should be in KES', () => {
      products.forEach(product => {
        expect(product.price).toBeGreaterThan(1000);
      });
    });
  });

  describe('getProductById', () => {
    test('should return product by id', () => {
      const product = getProductById(1);
      expect(product).toBeDefined();
      expect(product.id).toBe(1);
    });

    test('should return undefined for non-existent id', () => {
      const product = getProductById(9999);
      expect(product).toBeUndefined();
    });
  });

  describe('createOrder', () => {
    test('should create order with correct structure', async () => {
      const orderData = {
        items: [{ id: 1, name: 'Test', quantity: 1, price: 5000 }],
        total: 5000,
        customer: { name: 'Test User', email: 'test@example.com' }
      };

      const order = await createOrder(orderData);

      expect(order).toHaveProperty('id');
      expect(order).toHaveProperty('createdAt');
      expect(order).toHaveProperty('status');
      expect(order.status).toBe('Processing');
      expect(order.items).toEqual(orderData.items);
    });

    test('should generate unique order IDs', async () => {
      const orderData = {
        items: [],
        total: 0,
        customer: { name: 'Test', email: 'test@example.com' }
      };

      const order1 = await createOrder(orderData);
      const order2 = await createOrder(orderData);

      expect(order1.id).not.toBe(order2.id);
    });
  });
});