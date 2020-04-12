const router = require('express').Router();
const userRouter = require('./api/user');
const messageRouter = require('./api/message');

router.use('/user', userRouter);
router.use('/message', messageRouter);

module.exports = router;
