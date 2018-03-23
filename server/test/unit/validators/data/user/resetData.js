const _ = require('lodash');

const validReset = {
  password: '12345Ab!'
};

module.exports = {
  getValid: () => _.clone(validReset),
  password: {
    none: undefined,
    tooShort: '1234Ab!',
    tooEasy: '12345678'
  }
};
