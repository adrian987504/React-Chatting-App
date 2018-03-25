const mongoose = require('mongoose');

const consecutiveFutureLocationSchema = new mongoose.Schema({
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

module.exports = consecutiveFutureLocationSchema;
