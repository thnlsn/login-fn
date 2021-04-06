const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Timestamp of the time the user was created
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
