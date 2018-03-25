const mongoose = require('mongoose');

const businessTypeCategories = require('./../enums/businessTypeCategories');
const businessTypes = require('./../enums/businessTypes');

const businessTypeSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: businessTypeCategories,
    required: true
  },
  value: {
    type: String,
    enum: businessTypes,
    required: true
  }
}, {
  _id: false
});

module.exports = businessTypeSchema;
