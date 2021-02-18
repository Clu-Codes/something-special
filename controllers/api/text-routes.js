const router = require('express').Router();
const { Chat, User, Post, Message, Category, Text } = require('../../models');
const withAuth = require('../../utils/auth');

// get all texts
router.get('/', (req, res) => {
    Text.findAll({
        attributes: [
            'id',
            'chat_text',
            'user_id',
            'chat_id',
            'created_at'
        ],
        order: [['created_at', 'DESC']]
    })
    .then(dbTextData => res.json(dbTextData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get single text by text ID
router.get('/:id', (req, res) => {
    Text.findOne({
        attributes: [
            'id',
            'chat_text',
            'user_id',
            'post_id',
            'chat_id',
            'created_at'
        ]
    })
    .then(dbTextData => res.json(dbTextData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create texts
router.post('/', withAuth, (req, res) => {
        Text.create({
            chat_text: req.body.chat_text,
            chat_id: req.body.chat_id,
            user_id: req.session.user_id
        })
        .then(dbTextData => res.json(dbTextData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// edit text
router.put('/:id', withAuth, (req, res) => {
    Text.update({
        chat_text: req.body.chat_text
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(textData => {
        if (!textData) {
            return res.status(404).json({
                message: 'No chat text found with that id'
            });
        }
        res.json(textData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete text
router.delete('/:id', withAuth, (req, res) => {
    Text.destroy({ 
        where: {
            id: req.params.id
        }
    })
        .then(dbTextData => {
            if(!dbTextData) {
                res.status(404).json({ message: 'No post found with this ID.' })
                return;
            };

            res.json(dbTextData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;