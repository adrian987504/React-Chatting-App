const mongoose = require('mongoose');

const websiteLanguages = require('./../../__/enums/websiteLanguages');

const businessSettingsSchema = new mongoose.Schema({
  showProfile: {
    type: Boolean,
    default: true,
    required: true
  },
  showReviews: {
    type: Boolean,
    default: true,
    required: true
  },
  allowReviews: {
    type: Boolean,
    default: true,
    required: true
  },
  showPinboardToPartners: {
    type: Boolean,
    default: true,
    required: true
  },
  showPinboardPublicly: {
    type: Boolean,
    default: true,
    required: true
  },
  allowUserMessages: {
    type: Boolean,
    default: true,
    required: true
  },
  isDeactivated: {
    type: Boolean,
    default: false,
    required: true
  },
  language: {
    type: String,
    enum: websiteLanguages,
    default: 'english',
    required: true
  }
}, {
  _id: false
});

module.exports = businessSettingsSchema;
