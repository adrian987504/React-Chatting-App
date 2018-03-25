const _ = require('lodash');
const mongoose = require('mongoose');
const mongoDbErrorHandler = require('mongoose-mongodb-errors');

const locationSchema = require('./../__/schemas/locationSchema');
const businessTypeSchema = require('./schemas/businessTypeSchema');
const businessMatchQuestionsSchema = require('./schemas/businessMatchQuestionsSchema');
const businessSettingsSchema = require('./schemas/businessSettingsSchema');
const imagesSchema = require('./../__/schemas/imagesSchema');

const customerAgeRanges = require('./enums/customerAgeRanges');
const languages = require('./../person/enums/languages');
const styleTypes = require('./../person/enums/styleTypes');

const { getBusinessLocationDistance } = require('./functions/businessFunctions');

mongoose.Promise = global.Promise;

const businessSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  slogan: {
    type: String,
    trim: true
  },
  location: {
    type: locationSchema
  },
  businessType: {
    type: [businessTypeSchema]
  },
  customerAgeRange: {
    type: [String],
    enum: customerAgeRanges
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  address: {
    type: [String],
    trim: true
  },
  openingHours: {
    type: String,
    trim: true
  },
  languages: {
    type: [String],
    enum: languages
  },
  customerStyleType: {
    type: [String],
    enum: styleTypes
  },
  currentlyHiring: {
    type: Boolean
  },
  specials: {
    type: String,
    trim: true
  },
  events: {
    type: String,
    trim: true
  },
  aboutUs: {
    type: String,
    trim: true
  },
  matchQuestions: {
    type: businessMatchQuestionsSchema,
    default: businessMatchQuestionsSchema,
    required: true
  },
  settings: {
    type: businessSettingsSchema,
    default: businessMatchQuestionsSchema,
    required: true
  },
  images: {
    type: imagesSchema,
    default: imagesSchema
  }
});

businessSchema.index({
  'location.position': '2dsphere'
});

const basicProfileKeys = [
  'name',
  'slogan',
  'location',
  'businessType',
  'customerAgeRange',
  'phoneNumber',
  'website',
  'address',
  'openingHours',
  'languages',
  'customerStyleType',
  'currentlyHiring',
  'specials',
  'events',
  'aboutUs'
];

const searchProfileKeys = [
  'score',
  'id',
  'owner',
  'name',
  'location',
  'images'
];

businessSchema.plugin(mongoDbErrorHandler);

businessSchema.methods.isPublic = function isPublic () {
  return this.settings.showProfile;
};

businessSchema.statics.getBasicProfileKeys = function getBasicProfileKeys () {
  return basicProfileKeys;
};

businessSchema.statics.getDistance = function getDistance (business, coordinates) {
  return getBusinessLocationDistance(business, coordinates);
};

businessSchema.statics.getSearchProfileKeys = function getSearchProfileKeys (business) {
  let keys = searchProfileKeys;
  if (business && business.settings) {
    const { showPinboardPublicly } = business.settings;
    if (!showPinboardPublicly) {
      keys = _.without(keys, 'images');
      keys = _.concat(keys, ['images.profileImages', 'images.backgroundImage']);
    }
  }
  return keys;
};

module.exports = mongoose.model('Business', businessSchema);
