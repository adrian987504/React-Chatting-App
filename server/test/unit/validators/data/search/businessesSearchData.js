const _ = require('lodash');

const validSearch = {
  coordinates: ['11.5754900', '48.1374300'],
  radius: '100',
  filter: 'gastro',
  skip: 0,
  languages: ['english'],
  styleType: ['conservative'],
  interestCategories: ['travel & lifestyle'],
  occupationCategories: ['management'],
  hasCrewId: false,
  ageRange: ['20-25'],
  businessTypeCategories: ['gastro', 'accomodation']
};

module.exports = {
  getValid: () => _.cloneDeep(validSearch),
  coordinates: {
    invalid: ['11,5754900', '48,1374300']
  },
  radius: {
    invalid: '100.5'
  },
  filter: {
    invalid: 'gastronomie'
  },
  skip: {
    invalid: -1
  },
  languages: {
    invalid: ['germany']
  },
  styleType: {
    invalid: ['conservativ']
  },
  ageRange: {
    invalid: ['16-21', '20-25']
  },
  interestCategories: {
    invalid: 'traveling & lifestyle'
  },
  occupationCategories: {
    invalid: 'managemen'
  },
  businessTypeCategories: {
    invalid: 'gast'
  }
};
