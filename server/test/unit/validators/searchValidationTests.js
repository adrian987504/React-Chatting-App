const { compose } = require('compose-middleware');

const {
  validatePeopleFromOriginSearch,
  validatePeopleInLocationSearch,
  validateBusinessesSearch,
  validateCouponsSearch
} = require('./../../../common/validators/searchValidators');

const messages = require('./../../../common/validators/messages/searchValidationMessages');
const peopleSearchData = require('./data/search/peopleSearchData');
const businessesSearchData = require('./data/search/businessesSearchData');
const couponsSearchData = require('./data/search/couponsSearchData');

const ValidationTester = require('./functions/ValidationTester');

describe('Search Validation', () => {
  describe('People Origin Search', () => {
    const test = new ValidationTester({
      validator: compose(validatePeopleFromOriginSearch),
      data: peopleSearchData,
      messages
    });

    it('works for valid people search', test.valid());

    it('fails for invalid coordinates', test.invalid('coordinates'));

    it('fails for invalid radius', test.invalid('radius'));

    it('fails for invalid filter', test.invalid('filter'));

    it('fails for invalid skip value', test.invalid('skip'));

    it('fails for invalid languages', test.invalid('languages'));

    it('fails for invalid style type', test.invalid('styleType'));

    it('fails for invalid personality', test.invalid('personality'));

    it('fails for invalid interest categories', test.invalid('interestCategories'));

    it('fails for invalid occupation categories', test.invalid('occupationCategories'));

    it('fails for invalid nightLifeAndSocializing', test.invalidBoolean('nightLifeAndSocializing'));

    it('fails for invalid cultureAndArt', test.invalidBoolean('cultureAndArt'));

    it('fails for invalid travelAndLifestyle', test.invalidBoolean('travelAndLifestyle'));

    it('fails for invalid musicAndEvents', test.invalidBoolean('musicAndEvents'));

    it('fails for invalid sportsAndFitness', test.invalidBoolean('sportsAndFitness'));

    it('fails for invalid hasCrewId', test.invalidBoolean('hasCrewId'));

    it('fails for invalid goShopping', test.invalidBoolean('goShopping'));

    it('fails for invalid doSports', test.invalidBoolean('doSports'));

    it('fails for invalid watchSports', test.invalidBoolean('watchSports'));
  });

  describe('People Location Search', () => {
    const test = new ValidationTester({
      validator: compose(validatePeopleInLocationSearch),
      data: peopleSearchData,
      messages
    });

    it('works for valid people search', test.valid());

    it('fails for invalid coordinates', test.invalid('coordinates'));

    it('fails for invalid radius', test.invalid('radius'));

    it('fails for invalid from date', test.invalid('fromDate'));

    it('fails for invalid to date', test.invalid('toDate'));

    it('fails for invalid filter', test.invalid('filter'));

    it('fails for invalid skip value', test.invalid('skip'));

    it('fails for invalid languages', test.invalid('languages'));

    it('fails for invalid style type', test.invalid('styleType'));

    it('fails for invalid personality', test.invalid('personality'));

    it('fails for invalid interest categories', test.invalid('interestCategories'));

    it('fails for invalid occupation categories', test.invalid('occupationCategories'));

    it('fails for invalid nightLifeAndSocializing', test.invalidBoolean('nightLifeAndSocializing'));

    it('fails for invalid cultureAndArt', test.invalidBoolean('cultureAndArt'));

    it('fails for invalid travelAndLifestyle', test.invalidBoolean('travelAndLifestyle'));

    it('fails for invalid musicAndEvents', test.invalidBoolean('musicAndEvents'));

    it('fails for invalid sportsAndFitness', test.invalidBoolean('sportsAndFitness'));

    it('fails for invalid hasCrewId', test.invalidBoolean('hasCrewId'));

    it('fails for invalid goShopping', test.invalidBoolean('goShopping'));

    it('fails for invalid doSports', test.invalidBoolean('doSports'));

    it('fails for invalid watchSports', test.invalidBoolean('watchSports'));
  });

  describe('Businesses Search', () => {
    const test = new ValidationTester({
      validator: compose(validateBusinessesSearch),
      data: businessesSearchData,
      messages
    });

    it('works for valid businesses search', test.valid());

    it('fails for invalid coordinates', test.invalid('coordinates'));

    it('fails for invalid radius', test.invalid('radius'));

    it('fails for invalid filter', test.invalid('filter'));

    it('fails for invalid skip value', test.invalid('skip'));

    it('fails for invalid languages', test.invalid('languages'));

    it('fails for invalid style type', test.invalid('styleType'));

    it('fails for invalid interest categories', test.invalid('interestCategories'));

    it('fails for invalid occupation categories', test.invalid('occupationCategories'));

    it('fails for invalid hasCrewId', test.invalidBoolean('hasCrewId'));

    it('fails for invalid age range', test.invalid('ageRange'));

    it('fails for invalid business type categories', test.invalid('businessTypeCategories'));
  });

  describe('Coupons Search', () => {
    const test = new ValidationTester({
      validator: compose(validateCouponsSearch),
      data: couponsSearchData,
      messages
    });

    it('works for valid businesses search', test.valid());

    it('fails for invalid coordinates', test.invalid('coordinates'));

    it('fails for invalid radius', test.invalid('radius'));

    it('fails for invalid from date', test.invalid('fromDate'));

    it('fails for invalid to date', test.invalid('toDate'));

    it('fails for invalid filter', test.invalid('filter'));

    it('fails for invalid skip value', test.invalid('skip'));

    it('fails for invalid languages', test.invalid('languages'));

    it('fails for invalid style type', test.invalid('styleType'));

    it('fails for invalid interest categories', test.invalid('interestCategories'));

    it('fails for invalid occupation categories', test.invalid('occupationCategories'));

    it('fails for invalid hasCrewId', test.invalidBoolean('hasCrewId'));

    it('fails for invalid age range', test.invalid('ageRange'));

    it('fails for invalid business type categories', test.invalid('businessTypeCategories'));
  });
});
