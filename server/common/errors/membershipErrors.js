exports.paymentPlanNotFoundError = {
  name: 'PaymentPlanNotFoundError',
  status: 404,
  message: 'The specified subscription could not be found'
};

exports.cannotUpgradeMembershipError = {
  name: 'CannotUpgradeMembershipError',
  status: 400,
  message: 'The membership could not be upgraded'
};

exports.cannotCancelMembershipError = {
  name: 'CannotCancelMembershipError',
  status: 400,
  message: 'The membership could not be cancelled'
};
