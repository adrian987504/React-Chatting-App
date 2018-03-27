const { compose } = require('compose-middleware');

const {
  validatePersonProfile,
  validatePersonMatchQuestions,
  validatePersonSettings
} = require('./../../../common/validators/personValidators');
const messages = require('./../../../common/validators/messages/personValidationMessages');
const personProfileData = require('./data/person/personProfileData');
const personMatchQuestionsData = require('./data/person/personMatchQuestionsData');
const personSettingsData = require('./data/person/personSettingsData');

const ValidationTester = require('./functions/ValidationTester');

describe('Person Validation', () => {
  describe('Basic Profile', () => {
    const test = new ValidationTester({
      validator: compose(validatePersonProfile),
      data: personProfileData,
      messages
    });

    it('works for valid person', test.valid());

    it('fails for long slogan', test.tooLong('slogan'));

    it('fails for invalid gender', test.invalid('gender'));

    it('fails for invalid date of birth', test.invalid('dateOfBirth'));

    it('fails for long origin name', test.tooLong('origin.name'));

    it('fails for long currently in name', test.tooLong('currentlyIn.name'));

    it('fails for long future location name', test.tooLong('futureLocations[0].name'));

    it('fails for invalid future location from date', test.invalid('futureLocations[0].fromDate'));

    it('fails for invalid future location to date', test.invalid('futureLocations[0].toDate'));

    it('fails for invalid language', test.invalid('languages'));

    it('fails for invalid personality', test.invalid('personality'));

    it('fails for invalid hair color', test.invalid('hairColor'));

    it('fails for invalid style type', test.invalid('styleType'));

    it('fails for invalid maritial status', test.invalid('maritialStatus'));

    it('fails for not boolean children', test.invalidBoolean('children'));

    it('fails for invalid occupation category', test.invalid('occupation[0].category'));

    it('fails for invalid occupation', test.invalid('occupation[0].value'));

    it('fails for invalid interest category', test.invalid('interests[0].category'));

    it('fails for invalid interest', test.invalid('interests[0].value'));

    it('fails for long about me', test.tooLong('aboutMe'));
  });

  describe('Match Questions', () => {
    const test = new ValidationTester({
      validator: compose(validatePersonMatchQuestions),
      data: personMatchQuestionsData,
      messages
    });

    it('works for valid match questions', test.valid());

    it('fails for not boolean hasCrewId', test.invalidBoolean('hasCrewId'));

    it('fails for not boolean sportsAndFitness', test.invalidBoolean('sportsAndFitness'));

    it('fails for not boolean musicAndEvents', test.invalidBoolean('musicAndEvents'));

    it('fails for not boolean travelAndLifestyle', test.invalidBoolean('travelAndLifestyle'));

    it('fails for not boolean cultureAndArt', test.invalidBoolean('cultureAndArt'));

    it('fails for not boolean nightLifeAndSocializing', test.invalidBoolean('nightLifeAndSocializing'));

    it('fails for not boolean watchSports', test.invalidBoolean('watchSports'));

    it('fails for not boolean doSports', test.invalidBoolean('doSports'));

    it('fails for not boolean goShopping', test.invalidBoolean('goShopping'));

    it('fails for invalid favorite foods', test.invalid('favoriteFoods'));
  });

  describe('Settings', () => {
    const test = new ValidationTester({
      validator: compose(validatePersonSettings),
      data: personSettingsData,
      messages
    });

    it('works for valid settings', test.valid());

    it('fails for invalid website language', test.invalid('language'));

    it('fails for not boolean isDeactivated', test.invalidBoolean('isDeactivated'));

    it('fails for not boolean allowUserMessages', test.invalidBoolean('allowUserMessages'));

    it('fails for not boolean showPinboardPublicly', test.invalidBoolean('showPinboardPublicly'));

    it('fails for not boolean showIfOnline', test.invalidBoolean('showIfOnline'));

    it('fails for not boolean showOnlyUserName', test.invalidBoolean('showOnlyUserName'));

    it('fails for not boolean showCurrentLocation', test.invalidBoolean('showCurrentLocation'));

    it('fails for not boolean showProfile', test.invalidBoolean('showProfile'));
  });
});
