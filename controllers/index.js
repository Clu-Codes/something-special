const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes.js');
const chatRoutes = require('./chat-routes');

router.use('/api', apiRoutes);

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/chats', chatRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;