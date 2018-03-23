const _ = require('lodash');
const rs = require('randomstring');

const validCoupon = {
  locations: [{
    business: '5a4b945c9d5e182524dc025c',
    name: rs.generate(50),
    position: {
      coordinates: ['11.5754900', '48.1374300']
    }
  }],
  image: {
    imageId: '5a4b945c9d5e182524dc025c',
    extension: 'png'
  },
  reward: {
    category: 'discount',
    value: 'save 10%'
  },
  condition: {
    category: 'when purchasing',
    value: 'at least one item'
  },
  customTitle: rs.generate(50),
  customBody: rs.generate(50),
  fromDate: '2017-12-18',
  toDate: '2017-12-25',
  daysOfWeek: ['monday', 'tuesday'],
  timesOfDay: [
    { fromTime: 780, toTime: 840 }
  ],
  maxCount: 10,
  pin: rs.generate(4),
  termsAndConditions: rs.generate(1000),
  businessType: [{
    category: 'gastro',
    value: 'bar & lounge'
  }],
  customerAgeRange: ['20-25'],
  langagues: ['english'],
  customerStyleType: ['conservative'],
  matchQuestions: {
    customerInterests: [{
      category: 'travel & lifestyle',
      value: 'active vacation'
    }],
    customerOccupations: ['management'],
    discountWithCrewId: false
  },
  phoneNumber: rs.generate(20),
  website: rs.generate(200)
};

const invalidDate = '1988-08-277';

module.exports = {
  getValid: () => _.cloneDeep(validCoupon),
  locations: [{
    name: {
      tooLong: rs.generate(51)
    }
  }],
  image: {
    imageId: {
      none: undefined
    },
    extension: {
      invalid: 'pngg'
    }
  },
  reward: {
    category: {
      invalid: 'discounts'
    },
    value: {
      invalid: 'save 11%'
    }
  },
  condition: {
    category: {
      invalid: 'when buying'
    },
    value: {
      invalid: 'beer'
    }
  },
  customTitle: {
    tooLong: rs.generate(51)
  },
  customBody: {
    tooLong: rs.generate(51)
  },
  fromDate: {
    invalid: invalidDate
  },
  toDate: {
    invalid: invalidDate
  },
  daysOfWeek: {
    invalid: ['mondays', 'tuesday']
  },
  timesOfDay: [{
    fromTime: {
      invalid: -1
    },
    toTime: {
      invalid: 1440
    }
  }],
  maxCount: {
    tooLow: 0
  },
  pin: {
    tooShort: rs.generate(3)
  },
  termsAndConditions: {
    tooLong: rs.generate(1001)
  },
  businessType: [{
    category: {
      invalid: 'gastronomie'
    },
    value: {
      invalid: 'bar & lunch'
    }
  }],
  customerAgeRange: {
    invalid: ['21-25']
  },
  languages: {
    invalid: ['englisch']
  },
  customerStyleType: {
    invalid: ['conversative']
  },
  matchQuestions: {
    customerInterests: [{
      category: {
        invalid: 'travelling'
      },
      value: {
        invalid: 'activity vacation'
      }
    }],
    customerOccupations: {
      invalid: ['managing']
    }
  },
  phoneNumber: {
    tooLong: rs.generate(21)
  },
  website: {
    tooLong: rs.generate(201)
  }
};
