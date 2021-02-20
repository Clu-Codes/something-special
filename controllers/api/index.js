const router = require('express').Router();

const userRoutes = require('./user-routes');
const messageRoutes = require('./message-routes');
const postRoutes = require('./post-routes');
<<<<<<< HEAD
const tagRoutes = require('./tag-routes')
=======
const chatRoutes = require('./chat-routes');
const textRoutes = require('./text-routes');
>>>>>>> dcb1757b360dd3ea48aefb5153f5aaa67064d86a

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/posts', postRoutes);
<<<<<<< HEAD
router.use('/tag', tagRoutes)
=======
router.use('/chats', chatRoutes);
router.use('/texts', textRoutes);

>>>>>>> dcb1757b360dd3ea48aefb5153f5aaa67064d86a

module.exports = router;