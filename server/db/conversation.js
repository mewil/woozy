const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  conversationId: Number,
});

module.exports = mongoose.model('Conversation', conversationSchema);
