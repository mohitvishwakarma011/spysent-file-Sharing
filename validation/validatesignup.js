const validator = require('validator');

function validateSignUpData(data) {
  let errors = {};

  // Validate email
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Validate password
  if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password must be at least 6 characters long';
  }

  // Validate confirm password
  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

module.exports = validateSignUpData;
