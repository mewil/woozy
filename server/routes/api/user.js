const express = require('express');
const router = express.Router();

const User = require('../../db/user');

router.post('/', (req, res) => {
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
            message: 'successfully logged in user',
            data: user,
          });
        }
      },
    );
  }
});

router.get('/', (_req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      res.status(500).send({
        status: false,
        message: err,
      });
    } else {
      res.send({
        status: true,
        message: 'successfully fetched users',
        data: users,
      });
    }
  });
});

module.exports = router;
