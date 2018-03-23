const locationPartial = {
  name: {
    type: String,
    required: true
  },
  position: {
    type: {
      type: String,
      enum: 'Point',
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      default: undefined,
      validate: value => (value.length === 2),
      required: true
    }
  }
};

module.exports = locationPartial;
