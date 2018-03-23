const { check } = require('express-validator/check');

const { validationErrors } = require('./commonValidators');
const messages = require('./messages/membershipValidationMessages');

const membershipTypes = require('./../../models/membership/enums/membershipTypes');
const vatPercentages = require('./../../controllers/membership/pricing/vatPercentages.json');

const addCardValidator = [
  check('cardToken', messages.cardToken.invalid).isLength({ min: 28, max: 28 })
];

const securionValidator = [
  check('membershipType', messages.membershipType.invalid).isIn(membershipTypes),
  check('intervalCount', messages.intervalCount.invalid).isInt().matches(/1|3/),
  check('vat', messages.vat.invalid).isInt().isIn(vatPercentages),
  check('currency', messages.currency.invalid).isIn(['EUR', 'USD', 'GBP'])
];

const buySubscriptionValidator = securionValidator;
const upgradeSubscriptionValidator = securionValidator;
const buyOneTimeValidator = securionValidator;

module.exports = {
  validateAddCard: [
    addCardValidator,
    validationErrors
  ],
  validateBuySubscription: [
    buySubscriptionValidator,
    validationErrors
  ],
  validateUpgradeSubscription: [
    upgradeSubscriptionValidator,
    validationErrors
  ],
  validateBuyOneTime: [
    buyOneTimeValidator,
    validationErrors
  ]
};
