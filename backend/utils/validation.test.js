const { isValidEmail } = require('./validation');

describe('Validation Functions', () => {
  // Test cases for isValidEmail
  describe('isValidEmail', () => {
    test('should return true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co')).toBe(true);
      expect(isValidEmail('firstname+lastname@example.org')).toBe(true);
    });

    test('should return false for invalid emails', () => {
      expect(isValidEmail('plainaddress')).toBe(false);
      expect(isValidEmail('@missingusername.com')).toBe(false);
      expect(isValidEmail('username@.com')).toBe(false);
      expect(isValidEmail('username@domain.')).toBe(false);
      expect(isValidEmail('username@domain.c')).toBe(false); // too short TLD
      expect(isValidEmail('username@domain.corporate')).toBe(false); // too long TLD
      expect(isValidEmail(null)).toBe(false);
      expect(isValidEmail(undefined)).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(123)).toBe(false);
    });
  });

  // Password validation tests are now removed as per request
}); 