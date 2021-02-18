const router = require('express').Router();
const { Message } = require('../../models');
const withAuth = require('../../utils/auth');

// get all messages
router.get('/', (req, res) => {
    Message.findAll({
        attributes: [
            'id',
            'message_text',
            'user_id',
            'post_id',
            'created_at'
        ],
        order: [['created_at', 'DESC']]
    })
    .then(dbMessageData => res.json(dbMessageData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get single message by message ID
router.get('/:id', (req, res) => {
    Message.findOne({
        attributes: [
            'id',
            'message_text',
            'user_id',
            'post_id',
            'created_at'
        ]
    })
    .then(dbMessageData => res.json(dbMessageData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create messages
router.post('/', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        Message.create({
            message_text: req.body.message,
            post_id: req.body.postId,
            user_id: req.session.user_id
        })
        .then(dbMessageData => res.json(dbMessageData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    };
});

// edit message
router.put('/:id', withAuth, (req, res) => {
    Message.update({
        message_text: req.body.message
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(messageData => {
        if (!messageData) {
            return res.status(404).json({
                message: 'No post found with that id'
            });
        }
        res.json(messageData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete message
router.delete('/:id', withAuth, (req, res) => {
    Message.destroy({ 
        where: {
            id: req.params.id
        }
    })
        .then(dbMessageData => {
            if(!dbMessageData) {
                res.status(404).json({ message: 'No post found with this ID.' })
                return;
            };

            res.json(dbMessageData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;