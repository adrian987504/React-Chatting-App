const mongoose = require('mongoose');
const { supportedImageFormats } = require('../../../enums/images');

const imagePartial = {
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  extension: {
    type: String,
    required: true,
    enum: supportedImageFormats
  }
};

module.exports = imagePartial;
