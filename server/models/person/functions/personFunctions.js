const _ = require('lodash');
const moment = require('moment');
const haversine = require('haversine');

const getPersonOriginDistance = (person, coordinates) =>
  haversine(coordinates, person.origin.position.coordinates, { format: '[lon,lat]' });

const getPersonCurrentlyIn = (person) => {
  const now = moment.utc();

  const travelLocation = _.head(
    _.filter(person.futureLocations, futureLocation =>
      (now >= futureLocation.fromDate && now <= futureLocation.toDate)
    )
  );

  if (!_.isEmpty(travelLocation)) {
    return _.cloneDeep(_.pick(travelLocation, ['name', 'position.coordinates']));
  }

  return _.cloneDeep(person.currentlyIn);
};

const getPersonLocationAndDistance = (person, coordinates, fromDate, toDate) => {
  const travelLocations = _.filter(person.futureLocations, futureLocation => (
    (fromDate <= futureLocation.fromDate && futureLocation.fromDate <= toDate) ||
    (fromDate <= futureLocation.toDate && futureLocation.toDate <= toDate) ||
    (futureLocation.fromDate <= fromDate && toDate <= futureLocation.toDate)
  ));

  const locations = _.compact(_.concat(travelLocations, person.currentlyIn));

  const distances = _.map(locations, location =>
    haversine(coordinates, location.position.coordinates, { format: '[lon,lat]' })
  );

  const initialAccumulator = {
    index: 0,
    distance: distances[0]
  };

  const minimum = _.reduce(distances, (acc, val, key) => {
    if (val < acc.distance) {
      return { index: key, distance: val };
    }

    return acc;
  }, initialAccumulator);

  return {
    location: _.cloneDeep(locations[minimum.index]),
    distance: minimum.distance
  };
};

module.exports = {
  getPersonOriginDistance,
  getPersonCurrentlyIn,
  getPersonLocationAndDistance
};
