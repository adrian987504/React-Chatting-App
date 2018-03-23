const _ = require('lodash');
const rs = require('randomstring');

const validProfileImage = {
  position: 0,
  imageId: '5a2581a981881e2e50d85661',
  extension: 'jpeg'
};

const validPinboardImage = {
  position: 0,
  imageId: '5a2581a981881e2e50d85661',
  extension: 'jpeg',
  orientation: 'portrait',
  title: rs.generate(50),
  description: rs.generate(500)
};

const validImages = {
  profileImages: [validProfileImage],
  backgroundImage: {
    imageId: '5a2581a981881e2e50d85661',
    extension: 'png',
    isFromDefaultLibrary: false
  },
  pinboardImages: [validPinboardImage]
};

module.exports = {
  getValid: () => _.cloneDeep(validImages),
  profileImages: [{
    position: {
      tooLow: -1,
      tooHigh: 5
    },
    extension: {
      invalid: 'exe'
    }
  }],
  backgroundImage: {
    extension: {
      invalid: 'exe'
    }
  },
  pinboardImages: [{
    position: {
      tooLow: -1,
      tooHigh: 10
    },
    extension: {
      invalid: 'exe'
    },
    orientation: {
      invalid: 'portraitt'
    },
    title: {
      tooLong: rs.generate(51)
    },
    description: {
      tooLong: rs.generate(501)
    }
  }]
};
