const mongoose = require('mongoose');
const mongoDbErrorHandler = require('mongoose-mongodb-errors');
const { supportedImageFormats } = require('../../enums/images');

const couponLocationSchema = require('./schemas/couponLocationSchema');
const {
  rewardCategories,
  rewards,
  conditionCategories,
  conditions,
  linkingWords
} = require('../../enums/coupon');

const daysOfWeek = require('./enums/daysOfWeek');
const timesOfDaySchema = require('./schemas/timesOfDaySchema');

const businessTypeSchema = require('./../business/schemas/businessTypeSchema');
const languages = require('./../person/enums/languages');
const customerAgeRanges = require('./../business/enums/customerAgeRanges');
const styleTypes = require('./../person/enums/styleTypes');
const businessMatchQuestionsSchema = require('./../business/schemas/businessMatchQuestionsSchema');

const { getCouponLocationDistance, getCouponLocationDistances } = require('./functions/couponFunctions');

mongoose.Promise = global.Promise;

const couponSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  locations: {
    type: [couponLocationSchema],
    required: true
  },
  image: {
    imageId: {
      type: mongoose.Schema.Types.ObjectId
    },
    extension: {
      type: String,
      extension: supportedImageFormats
    }
  },
  reward: {
    category: {
      type: String,
      enum: rewardCategories
    },
    value: {
      type: String,
      enum: rewards
    }
  },
  condition: {
    category: {
      type: String,
      enum: conditionCategories
    },
    value: {
      type: String,
      enum: conditions
    }
  },
  linkingWord: {
    type: String,
    enum: linkingWords
  },
  isCustom: {
    type: Boolean,
    required: true,
    default: false
  },
  customTitle: {
    type: String
  },
  customBody: {
    type: String
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  daysOfWeek: {
    type: [String],
    enum: daysOfWeek
  },
  timesOfDay: {
    type: [timesOfDaySchema]
  },
  maxCount: {
    type: Number,
    required: true
  },
  remainingCount: {
    type: Number,
    required: true
  },
  redeemedCount: {
    type: Number,
    required: true,
    default: 0
  },
  phoneNumber: {
    type: String
  },
  website: {
    type: String
  },
  pin: {
    type: String
  },
  termsAndConditions: {
    type: String
  },
  businessType: {
    type: [businessTypeSchema]
  },
  languages: {
    type: [String],
    enum: languages
  },
  customerAgeRange: {
    type: [String],
    enum: customerAgeRanges
  },
  customerStyleType: {
    type: [String],
    enum: styleTypes
  },
  matchQuestions: {
    type: businessMatchQuestionsSchema,
    default: businessMatchQuestionsSchema,
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

couponSchema.plugin(mongoDbErrorHandler);

couponSchema.index({
  owner: 1
});

couponSchema.index({
  'locations.position': '2dsphere',
  fromDate: 1,
  toDate: 1
});

const newCouponKeys = [
  'locations',
  'image',
  'reward',
  'condition',
  'linkingWord',
  'isCustom',
  'customTitle',
  'customBody',
  'fromDate',
  'toDate',
  'daysOfWeek',
  'timesOfDay',
  'maxCount',
  'phoneNumber',
  'website',
  'pin',
  'termsAndConditions',
  'businessType',
  'languages',
  'customerAgeRange',
  'customerStyleType',
  'matchQuestions'
];

const updateCouponKeys = [
  'image',
  'phoneNumber',
  'website'
];

const returnCouponOwnerKeys = [
  'id',
  'locations',
  'image',
  'reward',
  'condition',
  'isCustom',
  'customTitle',
  'customBody',
  'fromDate',
  'toDate',
  'daysOfWeek',
  'timesOfDay',
  'maxCount',
  'remainingCount',
  'redeemedCount',
  'phoneNumber',
  'website',
  'termsAndConditions',
  'businessType',
  'languages',
  'customerAgeRange',
  'customerStyleType',
  'matchQuestions'
];

const returnCouponCustomerKeys = [
  'id',
  'locations',
  'image',
  'reward',
  'condition',
  'isCustom',
  'customTitle',
  'customBody',
  'fromDate',
  'toDate',
  'daysOfWeek',
  'timesOfDay',
  'maxCount',
  'remainingCount',
  'phoneNumber',
  'website',
  'termsAndConditions'
];

const searchCouponKeys = [
  'id',
  'locations',
  'image',
  'reward',
  'condition',
  'isCustom',
  'customTitle',
  'customBody',
  'fromDate',
  'toDate',
  'daysOfWeek',
  'timesOfDay',
  'maxCount',
  'remainingCount',
  'phoneNumber',
  'website',
  'termsAndConditions',
  'score'
];

couponSchema.statics.getNewCouponKeys = function getUpdateCouponKeys () {
  return newCouponKeys;
};

couponSchema.statics.getUpdateCouponKeys = function getUpdateCouponKeys () {
  return updateCouponKeys;
};

couponSchema.statics.getReturnCouponOwnerKeys = function getReturnCouponOwnerKeys () {
  return returnCouponOwnerKeys;
};

couponSchema.statics.getReturnCouponCustomerKeys = function getReturnCouponCustomerKeys () {
  return returnCouponCustomerKeys;
};

couponSchema.statics.getDistance = function getDistance (location, coordinates) {
  return getCouponLocationDistance(location, coordinates);
};

couponSchema.statics.getDistances = function getDistances (coupon, coordinates) {
  return getCouponLocationDistances(coupon, coordinates);
};

couponSchema.statics.getSearchCouponKeys = function getSearchCouponKeys () {
  return searchCouponKeys;
};

module.exports = mongoose.model('Coupon', couponSchema);
