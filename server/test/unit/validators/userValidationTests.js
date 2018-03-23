const { compose } = require('compose-middleware');

const {
  validateRegistration,
  validateResetRequest,
  validateReset,
  validateChangePassword
} = require('./../../../common/validators/userValidators');
const messages = require('./../../../common/validators/messages/userValidationMessages');

const registrationData = require('./data/user/registrationData');
const resetRequestData = require('./data/user/resetRequestData');
const resetData = require('./data/user/resetData');
const changePasswordData = require('./data/user/changePasswordData');

const ValidationTester = require('./functions/ValidationTester');

describe('User Validation', () => {
  describe('Registration', () => {
    const test = new ValidationTester({
      validator: compose(validateRegistration),
      data: registrationData,
      messages
    });

    it('works for valid registration', test.valid());

    it('fails for invalid email', test.invalid('email'));

    it('fails for short first name', test.tooShort('firstName'));

    it('fails for short last name', test.tooShort('lastName'));

    it('fails for no password', test.none('password'));

    it('fails for short password', test.tooShort('password'));

    it('fails for easy password', test.tooEasy('password'));

    it('fails for invalid account type', test.invalid('type'));
  });

  describe('Reset Request', () => {
    const test = new ValidationTester({
      validator: compose(validateResetRequest),
      data: resetRequestData,
      messages
    });

    it('works for valid reset request', test.valid());

    it('fails for invalid email address', test.invalid('email'));
  });

  describe('Reset', () => {
    const test = new ValidationTester({
      validator: compose(validateReset),
      data: resetData,
      messages
    });

    it('works for valid reset', test.valid());

    it('fails for no password', test.none('password'));

    it('fails for short password', test.tooShort('password'));

    it('fails for easy password', test.tooEasy('password'));
  });

  describe('Change Password', () => {
    const test = new ValidationTester({
      validator: compose(validateChangePassword),
      data: changePasswordData,
      messages
    });

    it('works for valid change password', test.valid());

    it('fails for no password', test.none('newPassword'));

    it('fails for short new password', test.tooShort('newPassword'));

    it('fails for easy new password', test.tooEasy('newPassword'));
  });
});
