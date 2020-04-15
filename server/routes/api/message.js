const express = require('express');
const routes = express.Router();

const Message = require('../../db/message');
const Conversation = require('../../db/conversation');

// Get all-messages
routes.route('/all-messages').get((_req, res) => {
  Message.find({}).exec((err, docs) => {
    if (err) {
      res.status(500).send({
        status: false,
        message: err,
      });
    }
    res.send({
      status: true,
      message: 'successfully received message',
      data: docs,
    });
  });
});

// Get all messages for a conversation
routes.route('/:conversation').get((req, res) => {
  // reverse sort by timestamp, give only last 25 messages
  const query = Message.find({ conversationId: req.params.conversation })
    .sort({ timestamp: -1 })
    .limit(25);
  query.exec((err, docs) => {
    if (err) {
      res.status(500).send({
        status: false,
        message: err,
      });
    }
    res.send({
      status: true,
      message: 'successfully retrived messages',
      data: docs,
    });
  });
});

// send a message Post request
routes.route('/send').post((req, res) => {
  const message = new Message(req.body);
  message.save().then(() => {
    res.send({
      status: true,
      message: 'message sent successfully',
    });
  });
});

// put route for updating messages to change the woozy status
// find one and update
// upsurt

// delete all messages -- for dev use only
routes.route('/reset').delete((req, res) => {
  Message.deleteMany({}, (err) => {
    Conversation.deleteMany({}, (converr) => {
      if (converr) {
        res.status(500).send({
          status: false,
          message: converr,
        });
      }
    });
    if (err) {
      res.status(500).send({
        status: false,
        message: err,
      });
    }
    res.send({
      status: true,
      message: 'deleted all messages and conversation successfully',
    });
  });
});

module.exports = routes;
