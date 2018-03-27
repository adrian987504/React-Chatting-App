const _ = require('lodash');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const crypto = require('crypto');
const iplocation = require('iplocation');
const { catchErrors } = require('../../utils/error');

const { loadUser, loadProfile } = require('./userMiddleware');
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
const Coupon = mongoose.model('Coupon');
const RadioStation = mongoose.model('RadioStation');

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

const loadCoupons = async (req, res, next) => {
  const { user } = res.locals;

  const fullUser = await User.findById(user.id).populate('coupons');

  res.locals.coupons = fullUser.coupons;

  return next();
};

const loadRadioStations = async (req, res, next) => {
  res.locals.radioStations = await RadioStation.find({}, { _id: 0, name: 1, place: 1, stream: 1 });

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
const returnCoupons = (req, res) => res.jsonSuccess(
  _.map(
    res.locals.coupons,
    coupon => _.pick(coupon, Coupon.getReturnCouponCustomerKeys())
  )
);
const returnRadioStations = (req, res) => res.jsonSuccess(res.locals.radioStations);
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
  loadProfile,
  loadCoupons: catchErrors(loadCoupons),
  loadRadioStations: catchErrors(loadRadioStations),
  getLocaleInfo: catchErrors(getLocaleInfo),
  returnSuccess,
  returnUser,
  returnCoupons,
  returnRadioStations,
  returnLocaleInfo
};
