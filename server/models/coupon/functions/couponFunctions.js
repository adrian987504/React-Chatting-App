const _ = require('lodash');
const haversine = require('haversine');

const getCouponLocationDistance = (location, coordinates) =>
  haversine(coordinates, location.position.coordinates, { format: '[lon,lat]' });

const getCouponLocationDistances = (coupon, coordinates) => _.map(coupon.locations,
  location => ({ business: location.business, distance: haversine(coordinates, location.position.coordinates, { format: '[lon,lat]' }) })
);

module.exports = {
  getCouponLocationDistance,
  getCouponLocationDistances
};
