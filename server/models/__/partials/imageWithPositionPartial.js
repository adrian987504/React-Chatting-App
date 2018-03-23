const imagePartial = require('./imagePartial');

const imageWithPositionPartial = {
  position: {
    type: Number,
    required: true
  },
  ...imagePartial
};

module.exports = imageWithPositionPartial;
