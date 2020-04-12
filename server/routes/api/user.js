const mongoose = require('mongoose');
const express = require('express');
const routes = express.Router();

const User = require('../../db/user');

routes.route('/').post((req, res) => {
  if (!req.body.userName) {
    res.status(400).send({
      status: false,
      message: 'must include userName JSON field',
    });
  } else {
    User.create(
      {
        userId: mongoose.Types.ObjectId(),
        userName: req.body.userName,
      },
      (err, user) => {
        if (err) {
          res.status(500).send({
            status: false,
            message: err,
          });
        } else {
          res.send({
            status: true,
            message: 'successfully created user',
            data: user,
          });
        }
      },
    );
  }
});

module.exports = routes;
