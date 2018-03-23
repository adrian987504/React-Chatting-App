const _ = require('lodash');

const validChangePassword = {
  oldPassword: '12345Ab!',
  newPassword: '12345Ab!'
};

module.exports = {
  getValid: () => _.clone(validChangePassword),
  newPassword: {
    none: undefined,
    tooShort: '1234Ab!',
    tooEasy: '12345678'
  }
};
