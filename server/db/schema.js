const mongoose = require('mongoose');

const userSchema = new Schema({
    user_id: String,
    password: String,
    trusted_friend_id: String,
    avoiding_id: [String]
});

var User = mongoose.model('User', yourSchema);