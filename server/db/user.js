const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  trustedFriendId: mongoose.Schema.Types.ObjectId,
  avoidingId: [mongoose.Schema.Types.ObjectId],
  startAvoidTimestamp: Date,
  endAvoidTimestamp: Date,
});

module.exports = mongoose.model('User', userSchema);
