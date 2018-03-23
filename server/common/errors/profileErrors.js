exports.profileNotFoundError = {
  name: 'ProfileNotFoundError',
  status: 404,
  message: 'The specified profile could not be found'
};

exports.profilePermissionError = {
  name: 'ProfilePermissionError',
  status: 403,
  message: 'You do not have permission to access this profile'
};

exports.imageNotFoundError = {
  name: 'ImageNotFoundError',
  status: 404,
  message: 'One or more of the specified images could not be found'
};

exports.invalidDateRangeError = {
  name: 'InvalidDateRangeError',
  status: 400,
  message: 'The fromDate needs to be before the toDate'
};

exports.overlappingDateRangeError = {
  name: 'OverlappingDateRangeError',
  status: 400,
  message: 'There is an overlap in the date ranges for future locations'
};
