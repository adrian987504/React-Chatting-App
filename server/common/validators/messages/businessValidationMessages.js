const { invalid, invalidBoolean, tooLong } = require('./commonValidationMessages');

module.exports = {
  name: {
    tooLong: tooLong('name', 50)
  },
  slogan: {
    tooLong: tooLong('slogan', 100)
  },
  location: {
    name: {
      tooLong: tooLong('location name', 50)
    }
  },
  businessType: [{
    category: {
      invalid: invalid('business type category')
    },
    value: {
      invalid: invalid('business type')
    }
  }],
  customerAgeRange: {
    invalid: invalid('age range')
  },
  phoneNumber: {
    tooLong: tooLong('phone number', 15)
  },
  website: {
    tooLong: tooLong('website', 100)
  },
  address: {
    tooLong: tooLong('address', 100)
  },
  openingHours: {
    tooLong: tooLong('opening hours', 100)
  },
  languages: {
    invalid: invalid('language')
  },
  customerStyleType: {
    invalid: invalid('customer style type')
  },
  specials: {
    tooLong: tooLong('specials', 100)
  },
  events: {
    tooLong: tooLong('events', 100)
  },
  aboutUs: {
    tooLong: tooLong('about us', 1000)
  },
  customerInterests: [{
    category: {
      invalid: invalid('interest category')
    },
    value: {
      invalid: invalid('interest')
    }
  }],
  customerOccupations: {
    invalid: invalid('occupation category')
  },
  language: {
    invalid: invalid('website language')
  },
  invalidBoolean: invalidBoolean()
};
