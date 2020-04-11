const router = require('express').Router();
const messageRouter = require('./api/message');

router.use('/message', messageRouter);

module.exports = router;
