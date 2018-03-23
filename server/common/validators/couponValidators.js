const { check } = require('express-validator/check');
const { supportedImageFormats } = require('../../../enums/images');

const { validationErrors, convertToDate, makeUnique, checkTimesOfDay } = require('./commonValidators');
const messages = require('./messages/couponValidationMessages');

const {
  rewardCategories,
  rewards,
  conditionCategories,
  conditions
} = require('../../../enums/coupon');
const daysOfWeek = require('./../../models/coupon/enums/daysOfWeek');

const businessTypeCategories = require('./../../models/business/enums/businessTypeCategories');
const businessTypes = require('./../../models/business/enums/businessTypes');
const customerAgeRanges = require('./../../models/business/enums/customerAgeRanges');
const languages = require('./../../models/person/enums/languages');
const styleTypes = require('./../../models/person/enums/styleTypes');
const interestCategories = require('./../../models/person/enums/interestCategories');
const interests = require('./../../models/person/enums/interests');
const occupationCategories = require('./../../models/person/enums/occupationCategories');

const commonCouponValidator = [
  check('phoneNumber', messages.phoneNumber.tooLong).optional().isLength({ max: 20 }),
  check('website', messages.website.tooLong).optional().isLength({ max: 200 })
];

const createCouponValidator = [
  ...commonCouponValidator,
  check('locations.*.name', messages.locations[0].name.tooLong).isLength({ max: 50 }),
  check('image.imageId', messages.image.imageId.none).exists(),
  check('image.extension', messages.image.extension.invalid).isIn(supportedImageFormats),
  check('reward.category', messages.reward.category.invalid).optional().isIn(rewardCategories),
  check('reward.value', messages.reward.value.invalid).optional().isIn(rewards),
  check('condition.category', messages.condition.category.invalid).optional().isIn(conditionCategories),
  check('condition.value', messages.condition.value.invalid).optional().isIn(conditions),
  check('isCustom', messages.invalidBoolean).optional().isBoolean(),
  check('customTitle', messages.customTitle.tooLong).optional().isLength({ max: 50 }),
  check('customBody', messages.customBody.tooLong).optional().isLength({ max: 50 }),
  check('fromDate', messages.fromDate.invalid).isISO8601(),
  convertToDate('fromDate'),
  check('toDate', messages.toDate.invalid).isISO8601(),
  convertToDate('toDate'),
  check('daysOfWeek.*', messages.daysOfWeek.invalid).optional().isIn(daysOfWeek),
  check('timesOfDay.*.fromTime', messages.timesOfDay[0].fromTime.invalid).optional().isInt({ min: 0, max: 1439 }),
  check('timesOfDay.*.toTime', messages.timesOfDay[0].toTime.invalid).optional().isInt({ min: 0, max: 1439 }),
  checkTimesOfDay('timesOfDay'),
  check('maxCount', messages.maxCount.tooLow).isInt({ min: 1 }),
  check('pin', messages.pin.tooShort).optional().isLength({ min: 4 }),
  check('termsAndConditions', messages.termsAndConditions.tooLong).optional().isLength({ max: 1000 }),
  makeUnique('businessType', 'value'),
  check('businessType.*.category', messages.businessType[0].category.invalid).optional().isIn(businessTypeCategories),
  check('businessType.*.value', messages.businessType[0].value.invalid).optional().isIn(businessTypes),
  makeUnique('customerAgeRange'),
  check('customerAgeRange.*', messages.customerAgeRange.invalid).optional().isIn(customerAgeRanges),
  makeUnique('languages'),
  check('languages.*', messages.languages.invalid).optional().isIn(languages),
  makeUnique('customerStyleType'),
  check('customerStyleType.*', messages.customerStyleType.invalid).optional().isIn(styleTypes),
  makeUnique('matchQuestions.customerInterests', 'value'),
  check('matchQuestions.customerInterests.*.category', messages.matchQuestions.customerInterests[0].category.invalid).optional().isIn(interestCategories),
  check('matchQuestions.customerInterests.*.value', messages.matchQuestions.customerInterests[0].value.invalid).optional().isIn(interests),
  makeUnique('matchQuestions.customerOccupations'),
  check('matchQuestions.customerOccupations.*', messages.matchQuestions.customerOccupations.invalid).optional().isIn(occupationCategories),
  check('matchQuestions.discountWithCrewId', messages.invalidBoolean).optional().isBoolean()
];

const updateCouponValidator = [
  ...commonCouponValidator,
  check('image.extension', messages.image.extension.invalid).optional().isIn(supportedImageFormats),
  check('maxCount', messages.maxCount.tooLow).optional().isInt({ min: 1 })
];

module.exports = {
  validateCreateCoupon: [
    createCouponValidator,
    validationErrors
  ],
  validateUpdateCoupon: [
    updateCouponValidator,
    validationErrors
  ]
};
