const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const routes = express.Router();

let Conversation = require('../../db/conversation');
let Message = require('../../db/message');
let User = require('../../db/user');
// const port = 3000;


// Get all-messages
routes.route('/all-messages').get(function(req, res) {
    Message.find(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// Get all messages for a conversation
routes.route('/messages/:conversation').get(function(req, res) {
    Message.find(req.params.conversation, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// send a message Post request
routes.route('/').post(function(req, res) {
    let message = new Message(req.body);
    message.save().then(message => {
        res.status(200).json({'message': 'message added successfully'});
    });
});
// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = routes;
