const auth = require('./auth');
const enums = require('./enums');
const error = require('./error');
const middleware = require('./middleware');
const coupon = require('./coupon');

module.exports = {
  auth,
  coupon,
  enums,
  error,
  middleware
};
