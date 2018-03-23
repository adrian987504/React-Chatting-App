const mongoose = require('mongoose');

const imageWithPositionPartial = require('./../partials/imageWithPositionPartial');
const orientations = require('./../enums/orientations');

const pinboardImageSchema = new mongoose.Schema({
  ...imageWithPositionPartial,
  orientation: {
    type: String,
    required: true,
    enum: orientations
  },
  title: {
    type: String
  },
  description: {
    type: String
  }
}, {
  _id: false
});

module.exports = pinboardImageSchema;
