const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes.js');
const chatRoutes = require('./chat-routes');
const searchRoute = require('./search-route');

router.use('/api', apiRoutes);

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/chat', chatRoutes);
router.use('/search', searchRoute);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;