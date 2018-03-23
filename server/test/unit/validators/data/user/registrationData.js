const _ = require('lodash');

const validUser = {
  email: 'john.smith.meet.direct@mailinator.com',
  firstName: 'John',
  lastName: 'Smith',
  password: '12345Ab!',
  type: 'private'
};

module.exports = {
  getValid: () => _.clone(validUser),
  email: {
    invalid: 'john.smith.meet.direct'
  },
  firstName: {
    tooShort: 'J'
  },
  lastName: {
    tooShort: 'S'
  },
  password: {
    none: undefined,
    tooShort: '1234Ab!',
    tooEasy: '12345678'
  },
  type: {
    invalid: 'p'
  }
};
