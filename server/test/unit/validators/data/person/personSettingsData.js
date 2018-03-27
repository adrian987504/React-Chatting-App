const _ = require('lodash');

const validSettings = {
  websiteLanguage: 'deutsch',
  isDeactivated: false,
  allowUserMessages: true,
  showPinboardPublicly: true,
  showIfOnline: true,
  showOnlyUserName: false,
  showCurrentLocation: true,
  showProfile: true
};

module.exports = {
  getValid: () => _.cloneDeep(validSettings),
  language: {
    invalid: 'german'
  }
};
