const haversine = require('haversine');

const getBusinessLocationDistance = (business, coordinates) =>
  haversine(coordinates, business.location.position.coordinates, { format: '[lon,lat]' });

module.exports = {
  getBusinessLocationDistance
};
