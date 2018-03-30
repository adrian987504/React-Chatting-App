const _ = require('lodash');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const crypto = require('crypto');
const iplocation = require('iplocation');
const { catchErrors } = require('../../utils/error');

const { loadUser } = require('./userMiddleware');
const {
  verificationTokenError,
  resetTokenError,
  incorrectUsernameError
} = require('./../../common/errors/userErrors');
const {
  validateRegistration,
  validateResetRequest,
  validateReset,
  validateChangePassword
} = require('./../../common/validators/userValidators');

const User = mongoose.model('User');

const register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isVerified: false,
    verificationToken: crypto.randomBytes(20).toString('hex')
  });

  const registerPromise = promisify(User.register, User);
  await registerPromise(user, req.body.password);

  res.locals.user = user;

  return next();
};

const verify = async (req, res, next) => {
  const user = await User.findOne({
    verificationToken: req.params.verificationToken
  });

  if (!user) {
    return next(verificationTokenError);
  }

  user.verificationToken = undefined;
  user.isVerified = true;
  await user.save();

  res.locals.user = user;

  return next();
};

const generateResetToken = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) {
    return next(incorrectUsernameError);
  }

  user.resetToken = crypto.randomBytes(20).toString('hex');
  await user.save();

  res.locals.user = user;

  return next();
};

const reset = async (req, res, next) => {
  const user = await User.findOne({
    resetToken: req.params.resetToken
  });

  if (!user) {
    return next(resetTokenError);
  }

  const setPasswordPromise = promisify(user.setPassword, user);
  await setPasswordPromise(req.body.password);

  user.resetToken = undefined;
  await user.save();

  return next();
};

const changePassword = async (req, res, next) => {
  const { user } = res.locals;
  const { oldPassword, newPassword } = req.body;

  const changePasswordPromise = promisify(user.changePassword, user);
  await changePasswordPromise(oldPassword, newPassword);

  return next();
};

const getLocaleInfo = async (req, res, next) => {
  const { country_code: country } = await iplocation(req.ip);
  const language = req.locale.toString();

  res.locals.localeInfo = { country, language };

  return next();
};

const returnSuccess = (req, res) => res.jsonSuccess();
const returnUser = (req, res) => res.jsonSuccess(_.pick(res.locals.user, User.getBasicUserKeys()));
const returnLocaleInfo = (req, res) => res.jsonSuccess(res.locals.localeInfo);

module.exports = {
  register: [
    validateRegistration,
    catchErrors(register)
  ],
  verify: catchErrors(verify),
  generateResetToken: [
    validateResetRequest,
    catchErrors(generateResetToken)
  ],
  reset: [
    validateReset,
    catchErrors(reset)
  ],
  changePassword: [
    validateChangePassword,
    catchErrors(changePassword)
  ],
  loadUser,
  getLocaleInfo: catchErrors(getLocaleInfo),
  returnSuccess,
  returnUser,
  returnLocaleInfo
};
