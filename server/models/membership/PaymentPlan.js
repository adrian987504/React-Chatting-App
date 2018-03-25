const mongoose = require('mongoose');
const mongoDbErrorHandler = require('mongoose-mongodb-errors');

mongoose.Promise = global.Promise;

const paymentPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  planId: {
    type: String,
    required: true
  }
});

paymentPlanSchema.plugin(mongoDbErrorHandler);

module.exports = mongoose.model('PaymentPlan', paymentPlanSchema, 'payment-plans');
