const _ = require('lodash');
const mongoose = require('mongoose');
const { catchErrors } = require('../../utils/error');

const { userNotFoundError, notBusinessUserError } = require('./../../common/errors/userErrors');
const { profileNotFoundError } = require('./../../common/errors/profileErrors');

const User = mongoose.model('User');

const loadUser = async (req, res, next) => {
  const user = await User.findById(res.locals.user.id);

  if (!user) {
    return next(userNotFoundError);
  }

  res.locals.user = user;

  return next();
};

module.exports = {
  loadUser: catchErrors(loadUser),
};
