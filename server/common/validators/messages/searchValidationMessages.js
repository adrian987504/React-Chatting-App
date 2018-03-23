const { invalid, invalidBoolean } = require('./commonValidationMessages');

module.exports = {
  coordinates: {
    invalid: invalid('coordinates')
  },
  radius: {
    invalid: invalid('radius')
  },
  fromDate: {
    invalid: invalid('date for fromDate')
  },
  toDate: {
    invalid: invalid('date for toDate')
  },
  filter: {
    invalid: invalid('filter')
  },
  skip: {
    invalid: invalid('skip value')
  },
  languages: {
    invalid: invalid('language')
  },
  styleType: {
    invalid: invalid('style type')
  },
  interestCategories: {
    invalid: invalid('interest category')
  },
  occupationCategories: {
    invalid: invalid('occupation category')
  },
  personality: {
    invalid: invalid('personality trait')
  },
  ageRange: {
    invalid: invalid('age range')
  },
  businessTypeCategories: {
    invalid: invalid('business type category')
  },
  invalidBoolean: invalidBoolean()
};
