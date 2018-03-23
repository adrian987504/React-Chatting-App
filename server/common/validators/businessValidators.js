const { check } = require('express-validator/check');

const { validationErrors, makeUnique } = require('./commonValidators');
const messages = require('./messages/businessValidationMessages');

const businessTypeCategories = require('./../../models/business/enums/businessTypeCategories');
const businessTypes = require('./../../models/business/enums/businessTypes');
const customerAgeRanges = require('./../../models/business/enums/customerAgeRanges');
const languages = require('./../../models/person/enums/languages');
const styleTypes = require('./../../models/person/enums/styleTypes');
const interestCategories = require('./../../models/person/enums/interestCategories');
const interests = require('./../../models/person/enums/interests');
const occupationCategories = require('./../../models/person/enums/occupationCategories');
const websiteLanguages = require('./../../models/__/enums/websiteLanguages');

const businessProfileValidator = [
  makeUnique('languages'),
  makeUnique('businessType', 'value'),
  makeUnique('customerAgeRange'),
  makeUnique('customerStyleType'),
  check('name', messages.name.tooLong).optional().isLength({ max: 50 }),
  check('slogan', messages.slogan.tooLong).optional().isLength({ max: 100 }),
  check('location.name', messages.location.name.tooLong).optional().isLength({ max: 50 }),
  check('businessType.*.category', messages.businessType[0].category.invalid).optional().isIn(businessTypeCategories),
  check('businessType.*.value', messages.businessType[0].value.invalid).optional().isIn(businessTypes),
  check('customerAgeRange.*', messages.customerAgeRange.invalid).optional().isIn(customerAgeRanges),
  check('phoneNumber', messages.phoneNumber.tooLong).optional().isLength({ max: 20 }),
  check('website', messages.website.tooLong).optional().isLength({ max: 100 }),
  check('address.*', messages.address.tooLong).optional().isLength({ max: 50 }),
  check('openingHours', messages.openingHours.tooLong).optional().isLength({ max: 100 }),
  check('languages.*', messages.languages.invalid).optional().isIn(languages),
  check('customerStyleType.*', messages.customerStyleType.invalid).optional().isIn(styleTypes),
  check('currentlyHiring', messages.invalidBoolean).optional().isBoolean(),
  check('specials', messages.specials.tooLong).optional().isLength({ max: 100 }),
  check('events', messages.events.tooLong).optional().isLength({ max: 100 }),
  check('aboutUs', messages.aboutUs.tooLong).optional().isLength({ max: 1000 })
];

const businessMatchQuestionsValidator = [
  makeUnique('customerInterests', 'value'),
  makeUnique('customerOccupations'),
  check('customerInterests.*.category', messages.customerInterests[0].category.invalid).optional().isIn(interestCategories),
  check('customerInterests.*.value', messages.customerInterests[0].value.invalid).optional().isIn(interests),
  check('customerOccupations.*', messages.customerOccupations.invalid).optional().isIn(occupationCategories),
  check('discountWithCrewId', messages.invalidBoolean).optional().isBoolean()
];

const businessSettingsValidator = [
  check('showProfile', messages.invalidBoolean).optional().isBoolean(),
  check('showReviews', messages.invalidBoolean).optional().isBoolean(),
  check('allowReviews', messages.invalidBoolean).optional().isBoolean(),
  check('showPinboardToPartners', messages.invalidBoolean).optional().isBoolean(),
  check('showPinboardPublicly', messages.invalidBoolean).optional().isBoolean(),
  check('allowUserMessages', messages.invalidBoolean).optional().isBoolean(),
  check('isDeactivated', messages.invalidBoolean).optional().isBoolean(),
  check('language', messages.language.invalid).optional().isIn(websiteLanguages)
];

module.exports = {
  validateBusinessProfile: [
    businessProfileValidator,
    validationErrors
  ],
  validateBusinessMatchQuestions: [
    businessMatchQuestionsValidator,
    validationErrors
  ],
  validateBusinessSettings: [
    businessSettingsValidator,
    validationErrors
  ]
};
