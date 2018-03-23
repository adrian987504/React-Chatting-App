const _ = require('lodash');
const rs = require('randomstring');

const validLocation = {
  name: rs.generate(50),
  coordinates: [11.5754900, 48.1374300]
};

const validFutureLocation = {
  ...validLocation,
  fromDate: '2017-11-21',
  toDate: '2017-11-28'
};

const validOccupation = {
  category: 'management',
  value: 'sales manager'
};

const validInterest = {
  category: 'travel & lifestyle',
  value: 'active vacation'
};

const validPerson = {
  slogan: rs.generate(100),
  gender: 'male',
  dateOfBirth: '1988-08-27',
  origin: _.clone(validLocation),
  currentlyIn: _.clone(validLocation),
  futureLocations: [validFutureLocation],
  languages: ['english', 'german'],
  personality: ['spontaneous'],
  hairColor: 'blond',
  styleType: ['conservative'],
  maritialStatus: 'single',
  children: true,
  occupation: [validOccupation],
  interests: [validInterest],
  aboutMe: rs.generate(1000)
};

const longLocationName = rs.generate(51);
const invalidDate = '1988-08-277';

module.exports = {
  getValid: () => _.cloneDeep(validPerson),
  slogan: {
    tooLong: rs.generate(101)
  },
  gender: {
    invalid: 'm'
  },
  dateOfBirth: {
    invalid: invalidDate
  },
  origin: {
    name: {
      tooLong: longLocationName
    }
  },
  currentlyIn: {
    name: {
      tooLong: longLocationName
    }
  },
  futureLocations: [{
    name: {
      tooLong: longLocationName
    },
    fromDate: {
      invalid: invalidDate
    },
    toDate: {
      invalid: invalidDate
    }
  }],
  languages: {
    invalid: ['germany']
  },
  personality: {
    invalid: ['spontaneously']
  },
  hairColor: {
    invalid: 'striped'
  },
  styleType: {
    invalid: ['conservativ']
  },
  maritialStatus: {
    invalid: 'singl'
  },
  occupation: [{
    category: {
      invalid: 'managemen'
    },
    value: {
      invalid: 'sale manager'
    }
  }],
  interests: [{
    category: {
      invalid: 'traveling & lifestyle'
    },
    value: {
      invalid: 'activity vacation'
    }
  }],
  aboutMe: {
    tooLong: rs.generate(1001)
  }
};
