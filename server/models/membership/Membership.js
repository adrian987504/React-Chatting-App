const mongoose = require('mongoose');
const mongoDbErrorHandler = require('mongoose-mongodb-errors');

const membershipTypes = require('./enums/membershipTypes');
const paymentProviders = require('./enums/paymentProviders');
const paymentTypes = require('./enums/paymentTypes');

mongoose.Promise = global.Promise;

const membershipSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: membershipTypes,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  paymentDetails: {
    provider: {
      type: String,
      enum: paymentProviders,
      required: true
    },
    type: {
      type: String,
      enum: paymentTypes,
      required: true
    },
    willRenew: {
      type: Boolean,
      required: true,
      default: false
    },
    chargeId: {
      type: String
    },
    subscriptionId: {
      type: String
    }
  }
});

membershipSchema.plugin(mongoDbErrorHandler);

membershipSchema.index({ owner: 1, startDate: 1, endDate: 1 });

const membershipKeys = [
  'id',
  'type',
  'startDate',
  'endDate',
  'paymentDetails'
];

membershipSchema.statics.getMembershipKeys = function getMembershipKeys () {
  return membershipKeys;
};

module.exports = mongoose.model('Membership', membershipSchema);
