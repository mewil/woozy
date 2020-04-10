const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  password: String,
  trusted_friend_id: mongoose.Schema.Types.ObjectId,
  avoiding_id: [mongoose.Schema.Types.ObjectId],
});

export const User = mongoose.model('User', userSchema);
