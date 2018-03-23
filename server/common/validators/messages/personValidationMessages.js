const { invalid, invalidBoolean, tooLong } = require('./commonValidationMessages');

module.exports = {
  slogan: {
    tooLong: tooLong('slogan', 100)
  },
  gender: {
    invalid: invalid('gender')
  },
  dateOfBirth: {
    invalid: invalid('date for the date of birth')
  },
  origin: {
    name: {
      tooLong: tooLong('origin name', 50)
    }
  },
  currentlyIn: {
    name: {
      tooLong: tooLong('currently in name', 50)
    }
  },
  futureLocations: [{
    name: {
      tooLong: tooLong('future location name', 50)
    },
    fromDate: {
      invalid: invalid('date for fromDate')
    },
    toDate: {
      invalid: invalid('date for toDate')
    }
  }],
  languages: {
    invalid: invalid('language')
  },
  personality: {
    invalid: invalid('personality trait')
  },
  hairColor: {
    invalid: invalid('hair color')
  },
  styleType: {
    invalid: invalid('style type')
  },
  maritialStatus: {
    invalid: invalid('maritial status')
  },
  occupation: [{
    category: {
      invalid: invalid('occupation category')
    },
    value: {
      invalid: invalid('occupation')
    }
  }],
  interests: [{
    category: {
      invalid: invalid('interest category')
    },
    value: {
      invalid: invalid('interest')
    }
  }],
  aboutMe: {
    tooLong: tooLong('about me', 1000)
  },
  favoriteFoods: {
    invalid: invalid('food type')
  },
  language: {
    invalid: invalid('website language')
  },
  invalidBoolean: invalidBoolean()
};
