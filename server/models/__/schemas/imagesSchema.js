const _ = require('lodash');
const mongoose = require('mongoose');
const { supportedImageFormats } = require('../../../enums/images');

const profileImageSchema = require('./profileImageSchema');
const pinboardImageSchema = require('./pinboardImageSchema');

const maxImageCount = max => values =>
  _.every(values, value => (value.position >= 0 && value.position < max));

const imagesSchema = new mongoose.Schema({
  profileImages: {
    type: [profileImageSchema],
    validate: maxImageCount(5)
  },
  backgroundImage: {
    imageId: {
      type: mongoose.Schema.Types.ObjectId
    },
    extension: {
      type: String,
      extension: supportedImageFormats
    },
    isFromDefaultLibrary: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  pinboardImages: {
    type: [pinboardImageSchema],
    validate: maxImageCount(10)
  }
}, {
  _id: false
});

module.exports = imagesSchema;
