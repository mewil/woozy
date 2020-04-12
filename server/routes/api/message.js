const express = require('express');
const routes = express.Router();

const Message = require('../../db/message');

// Get all-messages
routes.route('/all-messages').get((_req, res) => {
  Message.find((err, docs) => {
    if (err) {
      res.status(400);
    }
    res.status(200).json(docs);
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
      res.status(400);
    }
    res.status(200).json(docs);
  });
});

// send a message Post request
routes.route('/send').post((req, res) => {
  const message = new Message(req.body);
  message.save().then(() => {
    res.status(200).json({ message: 'message added successfully' });
  });
});

// delete all messages -- for dev use only
routes.route('/reset').delete((req, res) => {
  Message.deleteMany({}, (err) => {
    if (err) {
      res.status('BAD');
    }
    res.status(200);
  });
});

module.exports = routes;
