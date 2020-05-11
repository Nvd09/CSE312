const checker = require('validator');
const emptyChecker = require('./emptyChecker');

const registration_validation = (info) => {
  const errors = {};
  //console.log(info);

  /* eslint-disable no-param-reassign */
  info.first_name = !emptyChecker(info.first_name) ? info.first_name : '';
  info.last_name = !emptyChecker(info.last_name) ? info.last_name : '';
  info.email = !emptyChecker(info.email) ? info.email : '';
  info.password = !emptyChecker(info.password) ? info.password : '';
  
  

  if (checker.isEmpty(info.first_name)) {
    errors.name = 'First Name  is required';
  }
  if (checker.isEmpty(info.last_name)) {
    errors.name = 'Last Name  is required';
  }

  if (!checker.isEmail(info.email)) {
    errors.email = 'Email is invalid';
  }

  if (checker.isEmpty(info.email)) {
    errors.email = 'Email is required';
  }

  if (!checker.isLength(info.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have between 6 and 30 characters';
  }

  if (checker.isEmpty(info.password)) {
    errors.password = 'Password is required';
  }


  return {
    errors,
    isValid: emptyChecker(errors)
  };
};

module.exports = registration_validation;