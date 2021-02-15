const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const messageRoutes = require('./message-routes.js');
const postRoutes = require('./post-routes');
const chatRoutes = require('./chat-routes');

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/posts', postRoutes);
router.use('/chats', chatRoutes);


module.exports = router;