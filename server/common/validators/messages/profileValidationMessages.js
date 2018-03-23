const { invalid, tooLong } = require('./commonValidationMessages');

const tooLow = (field, min) => `Please use a number greater than ${min} for the ${field}`;
const tooHigh = (field, max) => `Please use a number less than ${max} for the ${field}`;

module.exports = {
  profileImages: [{
    position: {
      tooLow: tooLow('profile image', 0),
      tooHigh: tooHigh('profile image', 4)
    },
    extension: {
      invalid: invalid('profile image extension')
    }
  }],
  backgroundImage: {
    extension: {
      invalid: invalid('background image extension')
    }
  },
  pinboardImages: [{
    position: {
      tooLow: tooLow('pinboard image', 0),
      tooHigh: tooHigh('pinboard image', 9)
    },
    extension: {
      invalid: invalid('pinboard image extension')
    },
    orientation: {
      invalid: invalid('pinboard image orientation')
    },
    title: {
      tooLong: tooLong('pinboard image title', 50)
    },
    description: {
      tooLong: tooLong('pinboard image description', 500)
    }
  }]
};
