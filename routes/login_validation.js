const checker = require('validator');
const emptyChecker = require('./emptyChecker');

const login_validation = (info) => {
  const errors = {};

  info.email = !emptyChecker(info.email) ? info.email : '';
  info.password = !emptyChecker(info.password) ? info.password : '';
 

  if (!checker.isEmail(info.email)) {
    errors.email = 'Email is invalid';
  }

  if (checker.isEmpty(info.email)) {
    errors.email = 'Email is required';
  }

  if (!checker.isLength(info.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have 6 and 30 chars';
  }

  if (checker.isEmpty(info.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: emptyChecker(errors)
  };
};

module.exports = login_validation;