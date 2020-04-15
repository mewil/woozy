const router = require('express').Router();
const userRouter = require('./api/user');
const messageRouter = require('./api/message');
const conversationRouter = require('./api/conversation');

router.use('/user', userRouter);
router.use('/message', messageRouter);
router.use('/conversation', conversationRouter);

module.exports = router;
