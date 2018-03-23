const { compose } = require('compose-middleware');

const {
  validateAddCard,
  validateBuySubscription,
  validateUpgradeSubscription,
  validateBuyOneTime
} = require('./../../../common/validators/membershipValidators');
const messages = require('./../../../common/validators/messages/membershipValidationMessages');
const membershipData = require('./data/membership/membershipData');

const ValidationTester = require('./functions/ValidationTester');

describe('Membership Validation', () => {
  describe('Add Card', () => {
    const test = new ValidationTester({
      validator: compose(validateAddCard),
      data: membershipData,
      messages
    });

    it('works for valid card', test.valid());

    it('fails for invalid card token', test.invalid('cardToken'));
  });

  describe('Buy Subscription', () => {
    const test = new ValidationTester({
      validator: compose(validateBuySubscription),
      data: membershipData,
      messages
    });

    it('works for valid buy subscription', test.valid());

    it('fails for invalid membership type', test.invalid('membershipType'));

    it('fails for invalid interval count', test.invalid('intervalCount'));

    it('fails for invalid vat', test.invalid('vat'));

    it('fails for invalid currency', test.invalid('currency'));
  });

  describe('Upgrade Subscription', () => {
    const test = new ValidationTester({
      validator: compose(validateUpgradeSubscription),
      data: membershipData,
      messages
    });

    it('works for valid buy subscription', test.valid());

    it('fails for invalid membership type', test.invalid('membershipType'));

    it('fails for invalid interval count', test.invalid('intervalCount'));

    it('fails for invalid vat', test.invalid('vat'));

    it('fails for invalid currency', test.invalid('currency'));
  });

  describe('Buy One-time', () => {
    const test = new ValidationTester({
      validator: compose(validateBuyOneTime),
      data: membershipData,
      messages
    });

    it('works for valid buy subscription', test.valid());

    it('fails for invalid membership type', test.invalid('membershipType'));

    it('fails for invalid interval count', test.invalid('intervalCount'));

    it('fails for invalid vat', test.invalid('vat'));

    it('fails for invalid currency', test.invalid('currency'));
  });
});
