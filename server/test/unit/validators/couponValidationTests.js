const { compose } = require('compose-middleware');

const {
  validateCreateCoupon,
  validateUpdateCoupon
} = require('./../../../common/validators/couponValidators');
const messages = require('./../../../common/validators/messages/couponValidationMessages');
const couponData = require('./data/coupon/couponData');

const ValidationTester = require('./functions/ValidationTester');

describe('Coupon Validation', () => {
  describe('Create Coupon', () => {
    const test = new ValidationTester({
      validator: compose(validateCreateCoupon),
      data: couponData,
      messages
    });

    it('works for valid coupon', test.valid());

    it('fails for long location name', test.tooLong('locations[0].name'));

    it('fails for no image id', test.none('image.imageId'));

    it('fails for invalid image extension', test.invalid('image.extension'));

    it('fails for invalid reward category', test.invalid('reward.category'));

    it('fails for invalid reward', test.invalid('reward.value'));

    it('fails for invalid condition category', test.invalid('condition.category'));

    it('fails for invalid condition', test.invalid('condition.value'));

    it('fails for non-boolean isCustom', test.invalidBoolean('isCustom'));

    it('fails for long custom title', test.tooLong('customTitle'));

    it('fails for long custom body', test.tooLong('customBody'));

    it('fails for invalid from date', test.invalid('fromDate'));

    it('fails for invalid to date', test.invalid('toDate'));

    it('fails for invalid days of week', test.invalid('daysOfWeek'));

    it('fails for invalid times of day fromTime', test.invalid('timesOfDay[0].fromTime'));

    it('fails for invalid times of day toTime', test.invalid('timesOfDay[0].toTime'));

    it('fails for low max count', test.tooLow('maxCount'));

    it('fails for short pin', test.tooShort('pin'));

    it('fails for long terms and conditions', test.tooLong('termsAndConditions'));

    it('fails for invalid business type category', test.invalid('businessType[0].category'));

    it('fails for invalid business type', test.invalid('businessType[0].value'));

    it('fails for invalid customer age range', test.invalid('customerAgeRange'));

    it('fails for invalid language', test.invalid('languages'));

    it('fails for invalid customer style type', test.invalid('customerStyleType'));

    it('fails for invalid customer interest categories', test.invalid('matchQuestions.customerInterests[0].category'));

    it('fails for invalid customer interests', test.invalid('matchQuestions.customerInterests[0].value'));

    it('fails for invalid customer occupations', test.invalid('matchQuestions.customerOccupations'));

    it('fails for non-boolean discountWithCrewId', test.invalidBoolean('matchQuestions.discountWithCrewId'));

    it('fails for long phone number', test.tooLong('phoneNumber'));

    it('fails for long website', test.tooLong('website'));
  });

  describe('Update Coupon', () => {
    const test = new ValidationTester({
      validator: compose(validateUpdateCoupon),
      data: couponData,
      messages
    });

    it('works for valid match questions', test.valid());

    it('fails for invalid image extension', test.invalid('image.extension'));

    it('fails for low max count', test.tooLow('maxCount'));

    it('fails for long phone number', test.tooLong('phoneNumber'));

    it('fails for long website', test.tooLong('website'));
  });
});
