const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  fullName: String,
  username: String,
  hashedPassword: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
