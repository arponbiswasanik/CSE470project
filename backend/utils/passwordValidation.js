const isValidPassword = (password) => {
  // Password must be at least 6 characters long
  if (password.length < 6) return false;
  
  // Password must contain at least one number
  if (!/\d/.test(password)) return false;
  
  // Password must contain at least one letter
  if (!/[a-zA-Z]/.test(password)) return false;
  
  return true;
};

module.exports = { isValidPassword }; 