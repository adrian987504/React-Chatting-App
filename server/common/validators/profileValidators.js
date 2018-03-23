const { check } = require('express-validator/check');
const { supportedImageFormats } = require('../../../enums/images');

const orientations = require('./../../models/__/enums/orientations');

const { validationErrors, makeUnique } = require('./commonValidators');
const messages = require('./messages/profileValidationMessages');

const imagesValidator = [
  makeUnique('profileImages', 'position'),
  makeUnique('pinboardImages', 'position'),
  check('profileImages.*.position', messages.profileImages[0].position.tooLow).optional().isInt({ min: 0 }),
  check('profileImages.*.position', messages.profileImages[0].position.tooHigh).optional().isInt({ max: 4 }),
  check('profileImages.*.extension', messages.profileImages[0].extension.invalid).optional().isIn(supportedImageFormats),
  check('backgroundImage.extension', messages.backgroundImage.extension.invalid).optional().isIn(supportedImageFormats),
  check('pinboardImages.*.position', messages.pinboardImages[0].position.tooLow).optional().isInt({ min: 0 }),
  check('pinboardImages.*.position', messages.pinboardImages[0].position.tooHigh).optional().isInt({ max: 9 }),
  check('pinboardImages.*.extension', messages.pinboardImages[0].extension.invalid).optional().isIn(supportedImageFormats),
  check('pinboardImages.*.orientation', messages.pinboardImages[0].orientation.invalid).optional().isIn(orientations),
  check('pinboardImages.*.title', messages.pinboardImages[0].title.tooLong).optional().isLength({ max: 50 }),
  check('pinboardImages.*.description', messages.pinboardImages[0].description.tooLong).optional().isLength({ max: 500 })
];

module.exports = {
  validateImages: [
    imagesValidator,
    validationErrors
  ]
};
