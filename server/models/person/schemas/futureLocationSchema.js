const _ = require('lodash');
const mongoose = require('mongoose');

const locationPartial = require('./../../__/partials/locationPartial');

const futureLocationSchema = new mongoose.Schema({
  ...locationPartial,
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  }
}, {
  _id: false
});

futureLocationSchema.set('toJSON', {
  transform: (doc, ret, options) => _.pick(ret, ['name', 'position.coordinates', 'fromDate', 'toDate'])
});

module.exports = futureLocationSchema;
