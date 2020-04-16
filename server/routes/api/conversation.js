const express = require('express');
const router = express.Router();

const Conversation = require('../../db/conversation');

// GET all conversations
router.get('/', (_req, res) => {
  Conversation.aggregate([
    {
      $lookup: {
        from: 'messages',
        as: 'messages',
        let: { conversation: '$_id' },
        pipeline: [
          {
            $match: {
              $or: [
                {
                  $expr: {
                    $eq: ['$conversationId', '$$conversation'],
                  },
                },
                {
                  $expr: {
                    $eq: ['$trustedFriendConversationId', '$$conversation'],
                  },
                },
              ],
            },
          },
          { $sort: { timestamp: -1 } },
          { $limit: 1 },
        ],
      },
    },
    { $addFields: { lastMessage: { $arrayElemAt: ['$messages', 0] } } },
    { $unset: 'messages' },
  ]).exec((err, conversations) => {
    if (err) {
      res.status(500).send({
        status: false,
        message: err,
      });
    }
    res.send({
      status: true,
      message: 'successfully fetched conversations',
      data: conversations,
    });
  });
});

// POST create conversation
router.post('/', (req, res) => {
  const { participantIds } = req.body;
  Conversation.create({ participantIds }, (err, conversation) => {
    if (err) {
      res.status(500).send({
        status: false,
        message: err,
      });
    }
    res.send({
      status: true,
      message: 'successfully created conversation',
      data: conversation,
    });
  });
});

module.exports = router;
