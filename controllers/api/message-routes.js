const router = require('express').Router();
const { Message } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
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

// create comment
router.post('/', withAuth, (req, res) => {
    console.log(req.session);
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
    }
});

// delete comment
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