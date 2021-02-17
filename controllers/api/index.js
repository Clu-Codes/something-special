const router = require('express').Router();

const userRoutes = require('./user-routes');
const messageRoutes = require('./message-routes');
const postRoutes = require('./post-routes');
const chatRoutes = require('./chat-routes');
const textRoutes = require('./text-routes');

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/posts', postRoutes);
router.use('/chats', chatRoutes);
router.user('/texts', textRoutes);


module.exports = router;