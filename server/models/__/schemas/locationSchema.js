const _ = require('lodash');
const mongoose = require('mongoose');

const locationPartial = require('./../../__/partials/locationPartial');

const locationSchema = new mongoose.Schema(locationPartial, {
  _id: false
});

locationSchema.set('toJSON', {
  transform: (doc, ret, options) => _.pick(ret, ['name', 'position.coordinates'])
});

module.exports = locationSchema;
