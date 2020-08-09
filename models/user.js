const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /https?:\/\/([a-z\d]+(-[a-z\d]+)*\.)+[a-z][a-z]+(\/[A-Za-z\d\-_]+)*\.(jpg|jpeg|gif|png|bmp)/.test(value),
    },
    message: 'ad',
  },
});

module.exports = mongoose.model('user', userSchema);
