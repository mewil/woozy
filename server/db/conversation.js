const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  conversationId: mongoose.Schema.Types.ObjectId,
});

export const Conversation = mongoose.model('Conversation', conversationSchema);
