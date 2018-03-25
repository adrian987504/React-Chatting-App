const mongoose = require('mongoose');

const timesOfDaySchema = new mongoose.Schema({
  fromTime: {
    type: Number,
    required: true
  },
  toTime: {
    type: Number,
    required: true
  }
}, {
  _id: false
});

module.exports = timesOfDaySchema;
