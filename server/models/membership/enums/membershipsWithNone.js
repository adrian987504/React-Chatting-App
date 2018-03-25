const membershipTypes = require('./membershipTypes');

const membershipTypesWithNone = [
  'none',
  ...membershipTypes
];

module.exports = membershipTypesWithNone;
