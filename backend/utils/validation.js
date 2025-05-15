// Email validation function
function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  // Regular expression for basic email validation, now allowing '+'
  const emailRegex = /^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

// Password validation function
function isValidPassword(password) {
  if (!password || typeof password !== 'string') {
    return false;
  }

  // Criteria:
  // Minimum 8 characters
  // At least one uppercase letter
  // At least one lowercase letter
  // At least one number
  // At least one special character (e.g., !@#$%^&*)
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  );
}

module.exports = {
  isValidEmail,
  isValidPassword,
}; 