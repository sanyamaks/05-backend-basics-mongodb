const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,

  },
  link: {
    type: String,
    require: true,
    validate: {
      validator: (value) => /[1-9]/.test(value),
    },
    message: 'ad',

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,

  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now(),

  },
});

module.exports = mongoose.model('card', cardSchema);
