const mongoose = require('mongoose');

const imageWithPositionPartial = require('./../partials/imageWithPositionPartial');

const profileImageSchema = new mongoose.Schema(imageWithPositionPartial, {
  _id: false
});

module.exports = profileImageSchema;
