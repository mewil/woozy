const express = require('express');
const routes = express.Router();

const Message = require('../../db/message');

// Get all-messages
routes.route('/all-messages').get((req, res) => {
  Message.find((err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// Get all messages for a conversation
routes.route('/:conversation').get((req, res) => {
  // reverse sort by timestamp, give only last 25 messages
  const query = Message.find({conversationId: req.params.conversation}).sort({timestamp: -1}).limit(25);
  query.exec(function (err, docs) {
      res.json(docs);
  });
});

// send a message Post request
routes.route('/send').post((req, res) => {
  const message = new Message(req.body);
  message.save().then((message) => {
    res.status(200).json({ message: 'message added successfully' });
  });
});

// delete all messages -- for dev use only
routes.route('/reset').delete((req, res) => {
    Message.deleteMany({}, (err) => {
        res.status(200);
    });
});

module.exports = routes;
