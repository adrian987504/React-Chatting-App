const _ = require('lodash');

const validSettings = {
  language: 'deutsch',
  isDeactivated: false,
  allowUserMessages: true,
  showPinboardPublicly: true,
  showPinboardToPartners: true,
  allowReviews: true,
  showReviews: true,
  showProfile: true
};

module.exports = {
  getValid: () => _.cloneDeep(validSettings),
  language: {
    invalid: 'german'
  }
};
