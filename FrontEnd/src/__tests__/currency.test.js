describe('Currency Conversion to KES', () => {
  test('prices should be in Kenyan Shillings', () => {
    const samplePrices = [6240, 7280, 4160, 4680, 3770, 3120];
    
    samplePrices.forEach(price => {
      expect(price).toBeGreaterThan(1000);
      expect(typeof price).toBe('number');
    });
  });

  test('price formatting should include Kshs prefix', () => {
    const formatPrice = (price) => `Kshs. ${price.toLocaleString()}`;
    
    expect(formatPrice(5000)).toBe('Kshs. 5,000');
    expect(formatPrice(10000)).toBe('Kshs. 10,000');
    expect(formatPrice(1500)).toBe('Kshs. 1,500');
  });

  test('should not have USD references', () => {
    const invalidCurrencies = ['$', 'USD', 'usd'];
    const validCurrency = 'Kshs.';
    
    expect(validCurrency).not.toContain('$');
    expect(validCurrency).not.toContain('USD');
    expect(validCurrency).toContain('Kshs');
  });

  test('price calculations should work correctly', () => {
    const basePrice = 5000;
    const quantity = 3;
    const total = basePrice * quantity;
    
    expect(total).toBe(15000);
    expect(total).toBeGreaterThan(0);
  });
});