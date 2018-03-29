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
