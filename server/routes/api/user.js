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

// send a message Post request
router.route('/create').post((req, res) => {
  const user = new User(req.body);
  user.save().then(() => {
    res.send({
      status: true,
      message: 'User created successfully',
      data: user
    });
  });
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

// delete all messages -- for dev use only
router.route('/reset').delete((req, res) => {
  User.deleteMany({}, (err) => {
    if (err) {
      res.status(500).send({
        status: false,
        message: err,
      });
    }
    res.send({
      status: true,
      message: 'deleted all users successfully',
    });
  });
});

module.exports = router;
