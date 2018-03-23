const { invalid, invalidBoolean, none, tooLow, tooLong, tooShort } = require('./commonValidationMessages');

module.exports = {
  locations: [{
    name: {
      tooLong: tooLong('location name')
    }
  }],
  image: {
    imageId: {
      none: none('imageId')
    },
    extension: {
      invalid: invalid('extension')
    }
  },
  reward: {
    category: {
      invalid: invalid('reward category')
    },
    value: {
      invalid: invalid('reward')
    }
  },
  condition: {
    category: {
      invalid: invalid('condition category')
    },
    value: {
      invalid: invalid('condition')
    }
  },
  customTitle: {
    tooLong: tooLong('custom title', 50)
  },
  customBody: {
    tooLong: tooLong('custom body', 50)
  },
  fromDate: {
    invalid: invalid('date for fromDate')
  },
  toDate: {
    invalid: invalid('date for toDate')
  },
  daysOfWeek: {
    invalid: invalid('days of week')
  },
  timesOfDay: [{
    fromTime: {
      invalid: invalid('fromTime for time of day')
    },
    toTime: {
      invalid: invalid('toTime for time of day')
    }
  }],
  maxCount: {
    tooLow: tooLow('maxCount', 1)
  },
  pin: {
    tooShort: tooShort('pin')
  },
  termsAndConditions: {
    tooLong: tooLong('terms and conditions', 1000)
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
  languages: {
    invalid: invalid('language')
  },
  customerStyleType: {
    invalid: invalid('customer style type')
  },
  matchQuestions: {
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
    }
  },
  phoneNumber: {
    tooLong: tooLong('phone number', 20)
  },
  website: {
    tooLong: tooLong('website', 200)
  },
  invalidBoolean: invalidBoolean()
};
