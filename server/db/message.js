const mongoose = require('mongoose');

export const WOOZY_MESSAGE_STATUS = {
  NOT_WOOZY: 'not_woozy',
  PENDING: 'pending',
  APPROVED: 'approve',
  DENIED: 'denied',
};

const messageSchema = new mongoose.Schema({
  messageId: mongoose.Schema.Types.ObjectId,
  conversationId: mongoose.Schema.Types.ObjectId,
  content: String,
  timestamp: Date,
  fromUserId: mongoose.Schema.Types.ObjectId,
  toUserId: mongoose.Schema.Types.ObjectId,
  woozyApproved: {
    type: String,
    enum: Object.values(WOOZY_MESSAGE_STATUS),
    default: WOOZY_MESSAGE_STATUS.NOT_WOOZY,
  },
});

export const Message = mongoose.model('Message', messageSchema);
