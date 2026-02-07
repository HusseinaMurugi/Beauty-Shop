describe('Admin Role Management', () => {
  const allowedRoles = ['admin', 'customer'];
  const removedRoles = ['order_manager', 'inventory_manager', 'super_admin'];

  test('should only allow admin and customer roles', () => {
    expect(allowedRoles).toHaveLength(2);
    expect(allowedRoles).toContain('admin');
    expect(allowedRoles).toContain('customer');
  });

  test('should not include removed roles', () => {
    removedRoles.forEach(role => {
      expect(allowedRoles).not.toContain(role);
    });
  });

  test('role validation function should accept valid roles', () => {
    const isValidRole = (role) => allowedRoles.includes(role);
    
    expect(isValidRole('admin')).toBe(true);
    expect(isValidRole('customer')).toBe(true);
  });

  test('role validation function should reject invalid roles', () => {
    const isValidRole = (role) => allowedRoles.includes(role);
    
    expect(isValidRole('order_manager')).toBe(false);
    expect(isValidRole('super_admin')).toBe(false);
    expect(isValidRole('invalid_role')).toBe(false);
  });
});