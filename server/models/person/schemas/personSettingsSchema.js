const mongoose = require('mongoose');

const websiteLanguages = require('./../../__/enums/websiteLanguages');

const personSettingsSchema = new mongoose.Schema({
  showProfile: {
    type: Boolean,
    default: true,
    required: true
  },
  showCurrentLocation: {
    type: Boolean,
    default: true,
    required: true
  },
  showOnlyUserName: {
    type: Boolean,
    default: false,
    required: true
  },
  showIfOnline: {
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

module.exports = personSettingsSchema;
