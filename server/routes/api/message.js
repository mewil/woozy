const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = express.Router();

const Conversation = require('../../db/conversation');
const Message = require('../../db/message');
const User = require('../../db/user');
// const port = 3000;

// Get all-messages
routes.route('/all-messages').get((req, res) => {
  Message.find((err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// Get all messages for a conversation
routes.route('/messages/:conversation').get((req, res) => {
  // reverse sort by created-by, give only last 25 messages
  Message.find(req.params.conversation, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// send a message Post request
routes.route('/').post((req, res) => {
  const message = new Message(req.body);
  message.save().then((message) => {
    res.status(200).json({ message: 'message added successfully' });
  });
});
// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = routes;
