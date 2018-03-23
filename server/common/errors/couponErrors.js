exports.couponNotFoundError = {
  name: 'CouponNotFoundError',
  status: 404,
  message: 'The specified coupon could not be found'
};

exports.redemptionNotAllowedError = {
  name: 'RedemptionNotAllowedError',
  status: 403,
  message: 'You do not have permission to redeem this coupon'
};

exports.noCouponsLeftError = {
  name: 'NoCouponsLeftError',
  status: 410,
  message: 'There are no more coupons left to download'
};

exports.maximumCouponLimitError = {
  name: 'MaximumCouponLimitError',
  status: 410,
  message: 'The current user has reached the maximum coupon limit of 25'
};

exports.couponAlreadyDownloadedError = {
  name: 'CouponAlreadyDownloadedError',
  status: 410,
  message: 'The specified coupon has already been downloaded'
};

exports.couponNotRedeemedError = {
  name: 'CouponNotRedeemedError',
  status: 410,
  message: 'The specified user does not have this coupon downloaded, so it could not be redeemed'
};

exports.couponCreationNotAllowedError = {
  name: 'CouponCreationNotAllowedError',
  status: 403,
  message: 'The current user does not have the required membership to create a coupon'
};

exports.invalidRewardCategoryError = {
  name: 'InvalidRewardCategoryError',
  status: 400,
  message: 'The specified reward category cannot be used for your membership'
};

exports.invalidRewardError = {
  name: 'InvalidRewardError',
  status: 400,
  message: 'The specified reward cannot be used for your membership'
};

exports.invalidConditionCategoryError = {
  name: 'InvalidConditionCategoryError',
  status: 400,
  message: 'The specified condition category cannot be used for this reward'
};

exports.invalidConditionError = {
  name: 'InvalidConditionError',
  status: 400,
  message: 'The specified condition cannot be used for this reward'
};

exports.invalidBusinessIdError = {
  name: 'InvalidBusinessIdError',
  status: 400,
  message: 'One of the specified business ids is not valid for the current user'
};

exports.noRewardOrConditionError = {
  name: 'NoRewardOrConditionError',
  status: 400,
  message: 'No reward or condition was specified for the coupon'
};

exports.noCustomTitleOrBodyError = {
  name: 'NoCustomTitleOrBodyError',
  status: 400,
  message: 'No custom title or body was specified for the coupon'
};

exports.couponUpdateInvalidPermissionError = {
  name: 'CouponUpdateInvalidPermissionError',
  status: 403,
  message: 'You do not have permission to update this coupon'
};

exports.couponLimitReachedError = {
  name: 'CouponLimitReachedError',
  status: 410,
  message: 'You have reached the maximum coupon limit for your membership'
};

exports.customCouponCreationNotAllowedError = {
  name: 'CustomCouponCreationNotAllowedError',
  status: 400,
  message: 'You are not allowed to create custom coupons based on your membership'
};

exports.tooManyCouponLocationsError = {
  name: 'TooManyCouponLocationsError',
  status: 400,
  message: 'You have specified more coupon locations than you have business branches'
};

exports.invalidTimespanError = {
  name: 'InvalidTimespanError',
  status: 400,
  message: 'One or more timespans given for timesOfDay are invalid'
};

exports.tooManyTimespansError = {
  name: 'TooManyTimespansError',
  status: 400,
  message: 'Too many timespans given for timesOfDay'
};

exports.invalidCouponFromDate = {
  name: 'InvalidCouponFromDate',
  status: 400,
  message: 'The fromDate set for the coupon needs to be in the future'
};

exports.invalidCouponToDate = {
  name: 'InvalidCouponToDate',
  status: 400,
  message: 'Your membership expires before the toDate set for the coupon'
};
