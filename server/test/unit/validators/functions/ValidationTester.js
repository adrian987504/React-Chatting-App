const _ = require('lodash');
const { expect } = require('chai');
const httpMocks = require('node-mocks-http');

const validate = (validator, request) => {
  const req = httpMocks.createRequest(request);
  const res = httpMocks.createResponse();
  return new Promise((resolve, reject) => validator(req, res, resolve));
};
const validateBody = (validator, body) => validate(validator, { body });

class ValidationTester {
  constructor (args) {
    const { validator, data, messages } = args;
    this.validator = validator;
    this.data = data;
    this.messages = messages;
  }

  valid () {
    const { validator, data } = this;
    return async () => {
      const validationError = await validateBody(
        validator,
        data.getValid()
      );
      expect(validationError).to.be.undefined;
    };
  }

  replaceAndTest (property, testType) {
    const { validator, data, messages } = this;
    return async () => {
      const validationError = await validateBody(validator, _.set(
        data.getValid(),
        property,
        _.get(data, property)[testType]
      ));
      expect(validationError).to.exist;
      expect(validationError).to.have.property('name', 'ValidationError');
      expect(validationError).to.have.property('message', _.get(messages, property)[testType]);
    };
  }

  none (property) {
    return this.replaceAndTest(property, 'none');
  }

  invalid (property) {
    return this.replaceAndTest(property, 'invalid');
  }

  tooLong (property) {
    return this.replaceAndTest(property, 'tooLong');
  }

  tooShort (property) {
    return this.replaceAndTest(property, 'tooShort');
  }

  tooLow (property) {
    return this.replaceAndTest(property, 'tooLow');
  }

  tooHigh (property) {
    return this.replaceAndTest(property, 'tooHigh');
  }

  tooEasy (property) {
    return this.replaceAndTest(property, 'tooEasy');
  }

  invalidBoolean (property) {
    const { validator, data, messages } = this;
    return async () => {
      const validationError = await validateBody(validator, _.set(
        data.getValid(),
        property,
        'yes'
      ));
      expect(validationError).to.exist;
      expect(validationError).to.have.property('name', 'ValidationError');
      expect(validationError).to.have.property('message', _.get(messages, 'invalidBoolean'));
    };
  }
}

module.exports = ValidationTester;
