const _ = require('lodash');
const rs = require('randomstring');

const validLocation = {
  name: rs.generate(50),
  coordinates: [11.5754900, 48.1374300]
};

const validBusinessType = {
  category: 'gastro',
  value: 'bar & lounge'
};

const validBusiness = {
  name: rs.generate(50),
  slogan: rs.generate(100),
  location: validLocation,
  businessType: [validBusinessType],
  customerAgeRange: ['16-20', '20-25'],
  phoneNumber: rs.generate(20),
  website: rs.generate(100),
  address: [
    rs.generate(50),
    rs.generate(50),
    rs.generate(50),
    rs.generate(50),
    rs.generate(50),
    rs.generate(50)
  ],
  openingHours: rs.generate(100),
  languages: ['english', 'german'],
  customerStyleType: ['gothic', 'hipster'],
  currentlyHiring: false,
  specials: rs.generate(100),
  events: rs.generate(100),
  aboutUs: rs.generate(1000)
};

module.exports = {
  getValid: () => _.cloneDeep(validBusiness),
  name: {
    tooLong: rs.generate(51)
  },
  slogan: {
    tooLong: rs.generate(101)
  },
  location: {
    name: {
      tooLong: rs.generate(51)
    }
  },
  businessType: [{
    category: {
      invalid: 'gast'
    },
    value: {
      invalid: 'bar & loung'
    }
  }],
  customerAgeRange: {
    invalid: ['16-21', '20-25']
  },
  phoneNumber: {
    tooLong: rs.generate(21)
  },
  website: {
    tooLong: rs.generate(101)
  },
  address: {
    tooLong: [
      rs.generate(51),
      rs.generate(50),
      rs.generate(50),
      rs.generate(50),
      rs.generate(50),
      rs.generate(50)
    ]
  },
  openingHours: {
    tooLong: rs.generate(101)
  },
  languages: {
    invalid: ['englis', 'german']
  },
  customerStyleType: {
    invalid: ['gothi', 'hipster']
  },
  specials: {
    tooLong: rs.generate(101)
  },
  events: {
    tooLong: rs.generate(101)
  },
  aboutUs: {
    tooLong: rs.generate(1001)
  }
};
