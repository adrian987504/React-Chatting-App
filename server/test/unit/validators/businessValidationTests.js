const { compose } = require('compose-middleware');

const {
  validateBusinessProfile,
  validateBusinessMatchQuestions,
  validateBusinessSettings
} = require('./../../../common/validators/businessValidators');
const messages = require('./../../../common/validators/messages/businessValidationMessages');
const businessProfileData = require('./data/business/businessProfileData');
const businessMatchQuestionsData = require('./data/business/businessMatchQuestionsData');
const businessSettingsData = require('./data/business/businessSettingsData');

const ValidationTester = require('./functions/ValidationTester');

describe('Business Validation', () => {
  describe('Basic Profile', () => {
    const test = new ValidationTester({
      validator: compose(validateBusinessProfile),
      data: businessProfileData,
      messages
    });

    it('works for valid business', test.valid());

    it('fails for long name', test.tooLong('name'));

    it('fails for long slogan', test.tooLong('slogan'));

    it('fails for long location name', test.tooLong('location.name'));

    it('fails for invalid business type category', test.invalid('businessType[0].category'));

    it('fails for invalid business type', test.invalid('businessType[0].value'));

    it('fails for invalid customer age range', test.invalid('customerAgeRange'));

    it('fails for long phone number', test.tooLong('phoneNumber'));

    it('fails for long website', test.tooLong('website'));

    it('fails for long address', test.tooLong('address'));

    it('fails for long opening hours', test.tooLong('openingHours'));

    it('fails for invalid language', test.invalid('languages'));

    it('fails for invalid customer style type', test.invalid('customerStyleType'));

    it('fails for non-boolean currently hiring', test.invalidBoolean('currentlyHiring'));

    it('fails for long specials', test.tooLong('specials'));

    it('fails for long about us', test.tooLong('aboutUs'));
  });

  describe('Match Questions', () => {
    const test = new ValidationTester({
      validator: compose(validateBusinessMatchQuestions),
      data: businessMatchQuestionsData,
      messages
    });

    it('works for valid match questions', test.valid());

    it('fails for invalid customer interest category', test.invalid('customerInterests[0].category'));

    it('fails for invalid customer interest value', test.invalid('customerInterests[0].value'));

    it('fails for invalid customer occupation', test.invalid('customerOccupations'));

    it('fails for non-boolean discountWithCrewId', test.invalidBoolean('discountWithCrewId'));
  });

  describe('Settings', () => {
    const test = new ValidationTester({
      validator: compose(validateBusinessSettings),
      data: businessSettingsData,
      messages
    });

    it('works for valid settings', test.valid());

    it('fails for invalid language', test.invalid('language'));

    it('fails for not boolean isDeactivated', test.invalidBoolean('isDeactivated'));

    it('fails for not boolean allowUserMessages', test.invalidBoolean('allowUserMessages'));

    it('fails for not boolean showPinboardPublicly', test.invalidBoolean('showPinboardPublicly'));

    it('fails for not boolean showPinboardToPartners', test.invalidBoolean('showPinboardToPartners'));

    it('fails for not boolean allowReviews', test.invalidBoolean('allowReviews'));

    it('fails for not boolean showReviews', test.invalidBoolean('showReviews'));

    it('fails for not boolean showProfile', test.invalidBoolean('showProfile'));
  });
});
