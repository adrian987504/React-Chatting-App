const mongoose = require('mongoose');

const occupationCategories = require('./../enums/occupationCategories');
const occupations = require('./../enums/occupations');

const occupationSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: occupationCategories,
    required: true
  },
  value: {
    type: String,
    enum: occupations,
    required: true
  }
}, {
  _id: false
});

module.exports = occupationSchema;
