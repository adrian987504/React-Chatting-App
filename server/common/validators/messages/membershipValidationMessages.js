const { invalid } = require('./commonValidationMessages');

module.exports = {
  cardToken: {
    invalid: invalid('card token')
  },
  membershipType: {
    invalid: invalid('membership type')
  },
  intervalCount: {
    invalid: invalid('interval count')
  },
  vat: {
    invalid: invalid('vat')
  },
  currency: {
    invalid: invalid('currency')
  }
};
