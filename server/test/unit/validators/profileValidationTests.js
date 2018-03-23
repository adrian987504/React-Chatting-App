const { compose } = require('compose-middleware');

const {
  validateImages
} = require('./../../../common/validators/profileValidators');
const messages = require('./../../../common/validators/messages/profileValidationMessages');
const profileData = require('./data/profile/profileData');

const ValidationTester = require('./functions/ValidationTester');

describe('Person/Business Image Validation', () => {
  const test = new ValidationTester({
    validator: compose(validateImages),
    data: profileData,
    messages
  });

  describe('General', () => {
    it('works for valid images', test.valid());
  });

  describe('Profile Images', () => {
    it('fails for position too low', test.tooLow('profileImages[0].position'));

    it('fails for position too high', test.tooHigh('profileImages[0].position'));

    it('fails for invalid extension', test.invalid('profileImages[0].extension'));
  });

  describe('Background Image', () => {
    it('fails for invalid extension', test.invalid('backgroundImage.extension'));
  });

  describe('Pinboard Images', () => {
    it('fails for position too low', test.tooLow('pinboardImages[0].position'));

    it('fails for position too high', test.tooHigh('pinboardImages[0].position'));

    it('fails for invalid extension', test.invalid('pinboardImages[0].extension'));

    it('fails for invalid orientation', test.invalid('pinboardImages[0].orientation'));

    it('fails for long title', test.tooLong('pinboardImages[0].title'));

    it('fails for long description', test.tooLong('pinboardImages[0].description'));
  });
});
