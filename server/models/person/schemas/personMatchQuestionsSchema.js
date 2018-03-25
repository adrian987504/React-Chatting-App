const mongoose = require('mongoose');

const foods = require('./../enums/foods');

const personMatchQuestionsSchema = new mongoose.Schema({
  favoriteFoods: {
    type: [String],
    enum: foods,
    validate: value => (value.length <= 5)
  },
  goShopping: {
    type: Boolean,
    default: true,
    required: true
  },
  doSports: {
    type: Boolean,
    default: true,
    required: true
  },
  watchSports: {
    type: Boolean,
    default: true,
    required: true
  },
  nightLifeAndSocializing: {
    type: Boolean,
    default: true,
    required: true
  },
  cultureAndArt: {
    type: Boolean,
    default: true,
    required: true
  },
  travelAndLifestyle: {
    type: Boolean,
    default: true,
    required: true
  },
  musicAndEvents: {
    type: Boolean,
    default: true,
    required: true
  },
  sportsAndFitness: {
    type: Boolean,
    default: true,
    required: true
  },
  hasCrewId: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  _id: false
});

module.exports = personMatchQuestionsSchema;
