const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  conversationId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Conversation', conversationSchema);
