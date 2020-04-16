const mongoose = require('mongoose');

const WOOZY_MESSAGE_STATUS = {
  NOT_WOOZY: 'not_woozy',
  PENDING: 'pending',
  APPROVED: 'approved',
  DENIED: 'denied',
};

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  trustedFriendConversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  },
  content: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  woozyStatus: {
    type: String,
    enum: Object.values(WOOZY_MESSAGE_STATUS),
    default: WOOZY_MESSAGE_STATUS.NOT_WOOZY,
  },
});

module.exports = mongoose.model('Message', messageSchema);
