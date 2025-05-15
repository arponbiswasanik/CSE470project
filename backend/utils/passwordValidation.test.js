const { isValidPassword } = require('./passwordValidation');

describe('Password Validation Tests', () => {
  test('should accept valid passwords', () => {
    expect(isValidPassword('password123')).toBe(true);
    expect(isValidPassword('abc123')).toBe(true);
    expect(isValidPassword('123abc')).toBe(true);
  });

  test('should reject passwords that are too short', () => {
    expect(isValidPassword('pass1')).toBe(false);
    expect(isValidPassword('12345')).toBe(false);
  });

  test('should reject passwords without numbers', () => {
    expect(isValidPassword('password')).toBe(false);
    expect(isValidPassword('abcdef')).toBe(false);
  });

  test('should reject passwords without letters', () => {
    expect(isValidPassword('123456')).toBe(false);
    expect(isValidPassword('987654')).toBe(false);
  });

  test('should reject empty passwords', () => {
    expect(isValidPassword('')).toBe(false);
  });
}); 