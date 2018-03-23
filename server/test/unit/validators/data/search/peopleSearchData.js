const _ = require('lodash');

const validSearch = {
  coordinates: ['11.5754900', '48.1374300'],
  radius: '100',
  fromDate: '2017-12-18',
  toDate: '2017-12-25',
  filter: 'travel & lifestyle',
  skip: 0,
  languages: ['english'],
  styleType: ['conservative'],
  personality: ['tough', 'weird'],
  interestCategories: ['travel & lifestyle'],
  occupationCategories: ['management'],
  nightLifeAndSocializing: true,
  cultureAndArt: true,
  travelAndLifestyle: true,
  musicAndEvents: true,
  sportsAndFitness: true,
  hasCrewId: false,
  goShopping: true,
  doSports: true,
  watchSports: true
};

const invalidDate = '1988-08-277';

module.exports = {
  getValid: () => _.cloneDeep(validSearch),
  coordinates: {
    invalid: ['11,5754900', '48,1374300']
  },
  radius: {
    invalid: '100.5'
  },
  fromDate: {
    invalid: _.clone(invalidDate)
  },
  toDate: {
    invalid: _.clone(invalidDate)
  },
  filter: {
    invalid: 'traveling & lifestyle'
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
  interestCategories: {
    invalid: 'traveling & lifestyle'
  },
  occupationCategories: {
    invalid: 'managemen'
  },
  personality: {
    invalid: ['spontaneously']
  }
};
