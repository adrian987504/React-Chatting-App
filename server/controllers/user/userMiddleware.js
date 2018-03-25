const _ = require('lodash');
const mongoose = require('mongoose');
const { catchErrors } = require('../../utils/error');

const { userNotFoundError, notBusinessUserError } = require('./../../common/errors/userErrors');
const { profileNotFoundError } = require('./../../common/errors/profileErrors');

const User = mongoose.model('User');
const Person = mongoose.model('Person');
const Business = mongoose.model('Business');

const loadUser = async (req, res, next) => {
  const user = await User.findById(res.locals.user.id);

  if (!user) {
    return next(userNotFoundError);
  }

  res.locals.user = user;

  return next();
};

const loadProfile = async (req, res, next) => {
  const { user } = res.locals;

  if (user.isPrivate()) {
    const profile = await Person.findOne({
      owner: user.id
    });

    if (!profile) {
      return next(profileNotFoundError);
    }

    user.profileId = profile.id;
  } else {
    const profiles = await Business.find({
      owner: user.id
    });

    if (!profiles) {
      return next(profileNotFoundError);
    }

    user.profileIds = _.map(profiles, profile => profile.id);
  }

  return next();
};

const checkBusinessUser = (req, res, next) => {
  const { user } = res.locals;

  if (!user.isBusiness()) {
    return next(notBusinessUserError);
  }

  return next();
};

module.exports = {
  loadUser: catchErrors(loadUser),
  loadProfile: catchErrors(loadProfile),
  checkBusinessUser
};
