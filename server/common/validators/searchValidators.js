const { check } = require('express-validator/check');

const { validationErrors, convertToDate } = require('./commonValidators');
const messages = require('./messages/searchValidationMessages');

const languages = require('./../../models/person/enums/languages');
const personalities = require('./../../models/person/enums/personalities');
const styleTypes = require('./../../models/person/enums/styleTypes');
const occupationCategories = require('./../../models/person/enums/occupationCategories');
const interestCategories = require('./../../models/person/enums/interestCategories');

const customerAgeRanges = require('./../../models/business/enums/customerAgeRanges');
const businessTypeCategories = require('./../../models/business/enums/businessTypeCategories');

const commonSearchValidator = [
  check('coordinates.*', messages.coordinates.invalid).isDecimal(),
  check('radius', messages.radius.invalid).isInt(),
  check('skip', messages.skip.invalid).optional().isInt({ min: 0 }),
  check('languages.*', messages.languages.invalid).optional().isIn(languages),
  check('styleType.*', messages.styleType.invalid).optional().isIn(styleTypes),
  check('interestCategories.*', messages.interestCategories.invalid).optional().isIn(interestCategories),
  check('occupationCategories.*', messages.occupationCategories.invalid).optional().isIn(occupationCategories),
  check('hasCrewId', messages.invalidBoolean).optional().isBoolean()
];

const peopleSearchValidator = [
  ...commonSearchValidator,
  check('filter', messages.filter.invalid).optional().isIn(interestCategories),
  check('personality.*', messages.personality.invalid).optional().isIn(personalities),
  check('nightLifeAndSocializing', messages.invalidBoolean).optional().isBoolean(),
  check('cultureAndArt', messages.invalidBoolean).optional().isBoolean(),
  check('travelAndLifestyle', messages.invalidBoolean).optional().isBoolean(),
  check('musicAndEvents', messages.invalidBoolean).optional().isBoolean(),
  check('sportsAndFitness', messages.invalidBoolean).optional().isBoolean(),
  check('goShopping', messages.invalidBoolean).optional().isBoolean(),
  check('doSports', messages.invalidBoolean).optional().isBoolean(),
  check('watchSports', messages.invalidBoolean).optional().isBoolean()
];

const peopleFromOriginSearchValidator = peopleSearchValidator;

const peopleInLocationSearchValidator = [
  check('fromDate', messages.fromDate.invalid).optional().isISO8601(),
  convertToDate('fromDate'),
  check('toDate', messages.toDate.invalid).optional().isISO8601(),
  convertToDate('toDate'),
  ...peopleSearchValidator
];

const businessesSearchValidator = [
  ...commonSearchValidator,
  check('filter', messages.filter.invalid).optional().isIn(businessTypeCategories),
  check('ageRange.*', messages.ageRange.invalid).optional().isIn(customerAgeRanges),
  check('businessTypeCategories.*', messages.businessTypeCategories.invalid).optional().isIn(businessTypeCategories)
];

const couponsSearchValidator = [
  check('fromDate', messages.fromDate.invalid).optional().isISO8601(),
  convertToDate('fromDate'),
  check('toDate', messages.toDate.invalid).optional().isISO8601(),
  convertToDate('toDate'),
  ...businessesSearchValidator
];

module.exports = {
  validatePeopleFromOriginSearch: [
    peopleFromOriginSearchValidator,
    validationErrors
  ],
  validatePeopleInLocationSearch: [
    peopleInLocationSearchValidator,
    validationErrors
  ],
  validateBusinessesSearch: [
    businessesSearchValidator,
    validationErrors
  ],
  validateCouponsSearch: [
    couponsSearchValidator,
    validationErrors
  ]
};
