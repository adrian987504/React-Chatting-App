const mongoose = require('mongoose');

const interestSchema = require('./../../person/schemas/interestSchema');
const occupationCategories = require('./../../person/enums/occupationCategories');

const businessMatchQuestionsSchema = new mongoose.Schema({
  customerInterests: {
    type: [interestSchema]
  },
  customerOccupations: {
    type: [String],
    enum: occupationCategories
  },
  discountWithCrewId: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  _id: false
});

module.exports = businessMatchQuestionsSchema;
