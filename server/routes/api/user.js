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

// POST (PUT) request for added an avoided contact
router.put('/:id', (req, res) => {
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
          user.avoidingId.push(req.params.id);
          res.send({
            status: true,
            message: 'successfully updated avoided contacts',
            data: user.avoidingId,
          });
        }
      },
    );
  }
});

module.exports = router;
