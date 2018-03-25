const mongoose = require('mongoose');
const mongoDbErrorHandler = require('mongoose-mongodb-errors');

mongoose.Promise = global.Promise;

const radioSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  stream: {
    type: String,
    required: true
  }
});

radioSchema.plugin(mongoDbErrorHandler);

module.exports = mongoose.model('RadioStation', radioSchema, 'radio-stations');
