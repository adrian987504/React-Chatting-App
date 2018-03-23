const _ = require('lodash');

const validInterest = {
  category: 'travel & lifestyle',
  value: 'active vacation'
};

const validMatchQuestions = {
  customerInterests: [validInterest],
  customerOccupations: ['management'],
  discountWithCrewId: false
};

module.exports = {
  getValid: () => _.cloneDeep(validMatchQuestions),
  customerInterests: [{
    category: {
      invalid: 'travelling & lifestyle'
    },
    value: {
      invalid: 'activity vaction'
    }
  }],
  customerOccupations: {
    invalid: ['managing']
  }
};
