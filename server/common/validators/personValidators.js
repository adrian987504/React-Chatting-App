const { check } = require('express-validator/check');

const { validationErrors, makeUnique, convertToDate } = require('./commonValidators');
const messages = require('./messages/personValidationMessages');

const genders = require('./../../models/person/enums/genders');
const languages = require('./../../models/person/enums/languages');
const personalities = require('./../../models/person/enums/personalities');
const hairColors = require('./../../models/person/enums/hairColors');
const styleTypes = require('./../../models/person/enums/styleTypes');
const maritialStatuses = require('./../../models/person/enums/maritialStatuses');
const occupationCategories = require('./../../models/person/enums/occupationCategories');
const occupations = require('./../../models/person/enums/occupations');
const interestCategories = require('./../../models/person/enums/interestCategories');
const interests = require('./../../models/person/enums/interests');
const foods = require('./../../models/person/enums/foods');
const websiteLanguages = require('./../../models/__/enums/websiteLanguages');

const personProfileValidator = [
  makeUnique('languages'),
  makeUnique('personality'),
  makeUnique('styleType'),
  makeUnique('occupation', 'value'),
  makeUnique('interests', 'value'),
  check('slogan', messages.slogan.tooLong).optional().isLength({ max: 100 }),
  check('gender', messages.gender.invalid).optional().isIn(genders),
  check('dateOfBirth', messages.dateOfBirth.invalid).optional().isISO8601(),
  convertToDate('dateOfBirth'),
  check('origin.name', messages.origin.name.tooLong).optional().isLength({ max: 50 }),
  check('currentlyIn.name', messages.currentlyIn.name.tooLong).optional().isLength({ max: 50 }),
  check('futureLocations.*.name', messages.futureLocations[0].name.tooLong).optional().isLength({ max: 50 }),
  check('futureLocations.*.fromDate', messages.futureLocations[0].fromDate.invalid).optional().isISO8601(),
  check('futureLocations.*.toDate', messages.futureLocations[0].toDate.invalid).optional().isISO8601(),
  check('languages.*', messages.languages.invalid).optional().isIn(languages),
  check('personality.*', messages.personality.invalid).optional().isIn(personalities),
  check('hairColor', messages.hairColor.invalid).optional().isIn(hairColors),
  check('styleType.*', messages.styleType.invalid).optional().isIn(styleTypes),
  check('maritialStatus', messages.maritialStatus.invalid).optional().isIn(maritialStatuses),
  check('children', messages.invalidBoolean).optional().isBoolean(),
  check('occupation.*.category', messages.occupation[0].category.invalid).optional().isIn(occupationCategories),
  check('occupation.*.value', messages.occupation[0].value.invalid).optional().isIn(occupations),
  check('interests.*.category', messages.interests[0].category.invalid).optional().isIn(interestCategories),
  check('interests.*.value', messages.interests[0].value.invalid).optional().isIn(interests),
  check('aboutMe', messages.aboutMe.tooLong).optional().isLength({ max: 1000 })
];

const personMatchQuestionsValidator = [
  makeUnique('favoriteFoods'),
  check('favoriteFoods.*', messages.favoriteFoods.invalid).optional().isIn(foods),
  check('goShopping', messages.invalidBoolean).optional().isBoolean(),
  check('doSports', messages.invalidBoolean).optional().isBoolean(),
  check('watchSports', messages.invalidBoolean).optional().isBoolean(),
  check('nightLifeAndSocializing', messages.invalidBoolean).optional().isBoolean(),
  check('cultureAndArt', messages.invalidBoolean).optional().isBoolean(),
  check('travelAndLifestyle', messages.invalidBoolean).optional().isBoolean(),
  check('musicAndEvents', messages.invalidBoolean).optional().isBoolean(),
  check('sportsAndFitness', messages.invalidBoolean).optional().isBoolean(),
  check('hasCrewId', messages.invalidBoolean).optional().isBoolean()
];

const personSettingsValidator = [
  check('showProfile', messages.invalidBoolean).optional().isBoolean(),
  check('showCurrentLocation', messages.invalidBoolean).optional().isBoolean(),
  check('showOnlyFirstName', messages.invalidBoolean).optional().isBoolean(),
  check('showIfOnline', messages.invalidBoolean).optional().isBoolean(),
  check('showPinboardPublicly', messages.invalidBoolean).optional().isBoolean(),
  check('allowUserMessages', messages.invalidBoolean).optional().isBoolean(),
  check('isDeactivated', messages.invalidBoolean).optional().isBoolean(),
  check('language', messages.language.invalid).optional().isIn(websiteLanguages)
];

module.exports = {
  validatePersonProfile: [
    personProfileValidator,
    validationErrors
  ],
  validatePersonMatchQuestions: [
    personMatchQuestionsValidator,
    validationErrors
  ],
  validatePersonSettings: [
    personSettingsValidator,
    validationErrors
  ]
};
