const _ = require('lodash');
const mongoose = require('mongoose');

const locationPartial = require('./../../__/partials/locationPartial');

const couponLocationSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  ...locationPartial
}, {
  _id: false
});

couponLocationSchema.set('toJSON', {
  transform: (doc, ret, options) => _.pick(ret, ['business', 'name', 'position.coordinates'])
});

module.exports = couponLocationSchema;
