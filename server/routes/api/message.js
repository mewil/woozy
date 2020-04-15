const express = require('express');
const router = express.Router();

const Message = require('../../db/message');

// GET all messages given a conversation id
router.get('/:conversation', (req, res) => {
  Message.find({ conversationId: req.params.conversation })
    .sort({ timestamp: -1 })
    .limit(5)
    .exec((err, messages) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: err,
        });
      }
      res.send({
        status: true,
        message: 'successfully fetched messages',
        data: messages,
      });
    });
});

// POST create a new message
router.post('/', (req, res) => {
  Message.create(req.body, (err, message) => {
    if (err) {
      res.status(500).send({
        status: false,
        message: err,
      });
    }
    res.send({
      status: true,
      message: 'successfully created message',
      data: message,
    });
  });
});

// DELETE remove all messages
router.delete('/', (_req, res) => {
  Message.deleteMany({}, (err) => {
    if (err) {
      res.status(500).send({
        status: false,
        message: err,
      });
    }
    res.send({
      status: true,
      message: 'successfully deleted all messages',
    });
  });
});

module.exports = router;
