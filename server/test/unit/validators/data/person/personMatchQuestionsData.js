const _ = require('lodash');

const validMatchQuestions = {
  hasCrewId: false,
  sportsAndFitness: true,
  musicAndEvents: true,
  travelAndLifestyle: true,
  cultureAndArt: true,
  nightLifeAndSocializing: true,
  watchSports: true,
  doSports: true,
  goShopping: true,
  favoriteFoods: ['american']
};

module.exports = {
  getValid: () => _.cloneDeep(validMatchQuestions),
  favoriteFoods: {
    invalid: ['america']
  }
};
