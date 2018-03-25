const _ = require('lodash');
const mongoose = require('mongoose');
const mongoDbErrorHandler = require('mongoose-mongodb-errors');

const locationSchema = require('./../__/schemas/locationSchema');
const futureLocationSchema = require('./schemas/futureLocationSchema');
const consecutiveFutureLocationSchema = require('./schemas/consecutiveFutureLocationSchema');
const occupationSchema = require('./schemas/occupationSchema');
const interestSchema = require('./schemas/interestSchema');
const personMatchQuestionsSchema = require('./schemas/personMatchQuestionsSchema');
const personSettingsSchema = require('./schemas/personSettingsSchema');
const imagesSchema = require('./../__/schemas/imagesSchema');

const genders = require('./enums/genders');
const languages = require('./enums/languages');
const personalities = require('./enums/personalities');
const hairColors = require('./enums/hairColors');
const styleTypes = require('./enums/styleTypes');
const maritialStatuses = require('./enums/maritialStatuses');

const {
  getPersonOriginDistance,
  getPersonCurrentlyIn,
  getPersonLocationAndDistance
} = require('./functions/personFunctions');

mongoose.Promise = global.Promise;

const personSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  slogan: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: genders
  },
  dateOfBirth: {
    type: Date
  },
  origin: {
    type: locationSchema
  },
  currentlyIn: {
    type: locationSchema
  },
  futureLocations: {
    type: [futureLocationSchema]
  },
  consecutiveFutureLocations: {
    type: [consecutiveFutureLocationSchema]
  },
  languages: {
    type: [String],
    enum: languages
  },
  personality: {
    type: [String],
    enum: personalities
  },
  hairColor: {
    type: String,
    enum: hairColors
  },
  styleType: {
    type: [String],
    enum: styleTypes
  },
  maritialStatus: {
    type: String,
    enum: maritialStatuses
  },
  children: {
    type: Boolean
  },
  occupation: {
    type: [occupationSchema],
    validate: value => (value.length <= 2)
  },
  interests: {
    type: [interestSchema],
    validate: value => (value.length <= 10)
  },
  aboutMe: {
    type: String,
    trim: true
  },
  matchQuestions: {
    type: personMatchQuestionsSchema,
    default: personMatchQuestionsSchema,
    required: true
  },
  settings: {
    type: personSettingsSchema,
    default: personSettingsSchema,
    required: true
  },
  images: {
    type: imagesSchema,
    default: imagesSchema,
    required: true
  }
});

personSchema.plugin(mongoDbErrorHandler);

personSchema.index({
  'origin.position': '2dsphere'
});

personSchema.index({
  'currentlyIn.position': '2dsphere',
  'consecutiveFutureLocations.fromDate': 1,
  'consecutiveFutureLocations.toDate': 1
});

personSchema.index({
  'futureLocations.position': '2dsphere',
  'futureLocations.fromDate': 1,
  'futureLocations.toDate': 1
});

const basicProfileKeys = [
  'firstName',
  'lastName',
  'slogan',
  'gender',
  'dateOfBirth',
  'origin',
  'currentlyIn',
  'futureLocations',
  'languages',
  'personality',
  'hairColor',
  'styleType',
  'maritialStatus',
  'children',
  'occupation',
  'interests',
  'aboutMe'
];

const searchProfileKeys = [
  'score',
  'id',
  'owner',
  'firstName',
  'lastName',
  'origin',
  'location',
  'distance',
  'currentlyIn',
  'images'
];

personSchema.methods.isPublic = function isPublic () {
  return this.settings.showProfile;
};

personSchema.statics.getBasicProfileKeys = function getBasicProfileKeys () {
  return basicProfileKeys;
};

personSchema.statics.getOriginDistance = function getOriginDistance (person, coordinates) {
  return getPersonOriginDistance(person, coordinates);
};

personSchema.statics.getCurrentlyIn =
  function getCurrentlyIn (person) {
    return getPersonCurrentlyIn(person);
  };

personSchema.statics.getLocationAndDistance =
  function getLocationAndDistance (person, coordinates, fromDate, toDate) {
    return getPersonLocationAndDistance(person, coordinates, fromDate, toDate);
  };

personSchema.statics.getSearchProfileKeys = function getSearchProfileKeys (person) {
  let keys = searchProfileKeys;
  if (person && person.settings) {
    const { showCurrentLocation, showOnlyFirstName, showPinboardPublicly } = person.settings;
    if (!showCurrentLocation) {
      keys = _.without(keys, 'currentlyIn');
    }
    if (showOnlyFirstName) {
      keys = _.without(keys, 'lastName');
    }
    if (!showPinboardPublicly) {
      keys = _.without(keys, 'images');
      keys = _.concat(keys, ['images.profileImages', 'images.backgroundImage']);
    }
  }
  return keys;
};

module.exports = mongoose.model('Person', personSchema);
