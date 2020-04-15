const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  trustedFriendId: Number,
  avoidingId: [Number],
});

module.exports = mongoose.model('User', userSchema);
