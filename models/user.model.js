const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  fullName: String,
  username: String,
  hashedPassword: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
