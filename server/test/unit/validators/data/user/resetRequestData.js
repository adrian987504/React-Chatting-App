const _ = require('lodash');

const validResetRequest = {
  email: 'john.smith.meet.direct@mailinator.com'
};

module.exports = {
  getValid: () => _.clone(validResetRequest),
  email: {
    invalid: 'john.smith.meet.direct'
  }
};
