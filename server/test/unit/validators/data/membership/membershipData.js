const _ = require('lodash');
const rs = require('randomstring');

const validMembership = {
  cardToken: rs.generate(28),
  membershipType: 'lite',
  intervalCount: 3,
  vat: 18,
  currency: 'EUR'
};

module.exports = {
  getValid: () => _.cloneDeep(validMembership),
  cardToken: {
    invalid: rs.generate(29)
  },
  membershipType: {
    invalid: 'litee'
  },
  intervalCount: {
    invalid: 2
  },
  vat: {
    invalid: 17
  },
  currency: {
    invalid: 'EURO'
  }
};
