const validator = require("validator");

function validateSignUpData(userData) {
  let errors = [];

  // Validate email
  if (!validator.isEmail(userData.email)) {
    errors.push("Email is invalid");
  }

  // Validate password
  if (!validator.isLength(userData.password, { min: 6 })) {
    errors.push("Password must be at least 6 characters long");
  }

  // Validate confirm password
  if (!validator.equals(userData.password, userData.re_password)) {
    errors.push("Both passwords must match");
  }

  return errors;
}

module.exports = validateSignUpData;
