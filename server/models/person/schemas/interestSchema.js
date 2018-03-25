const mongoose = require('mongoose');

const interestCategories = require('./../enums/interestCategories');
const interests = require('./../enums/interests');

const interestSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: interestCategories,
    required: true
  },
  value: {
    type: String,
    enum: interests,
    required: true
  }
}, {
  _id: false
});

module.exports = interestSchema;
