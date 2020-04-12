const express = require('express');
const routes = express.Router();

const User = require('../../db/user');

routes.route('/').post((req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(400).send({
      status: false,
      message: 'must include username JSON field',
    });
  } else {
    User.findOneAndUpdate(
      { username },
      { username },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
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
