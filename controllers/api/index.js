const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const messageRoutes = require('./message-routes.js');
const postRoutes = require('./post-routes');
const tagRoutes = require('./tag-routes')

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/posts', postRoutes);
router.use('/tag', tagRoutes)

module.exports = router;