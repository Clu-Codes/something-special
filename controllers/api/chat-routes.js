const router = require('express').Router();
const { Chat, User, Post, Message, Category, Text } = require('../../models');
const withAuth = require('../../utils/auth');



router.get('/:id', (req, res) => {
    Chat.findOne({
        where: {
            id: req.params.id
        },
        attributes:[
            'id',
            'recipient',
            'post_id',
            'user_id'
        ],
        include: [
                 {
                model:User,
                attributes: ['username']
            }
        ]
    })
    .then(dbChatData => {
        return res.json(dbChatData)})
    .catch(err => {
        console.log(err);
        return res.status(500).json(err);
    });
});

router.post('/', withAuth, (req,res) => {
    Chat.findOrCreate({
        where:
        {user_id: req.body.user_id,
        post_id: req.body.post_id,
        recipient: req.body.recipient}
    })
    .then(dbChatData => res.json(dbChatData))
    .catch(err => {
        console.log(err);
        return res.status(500).json(err);
    });
});

// delete chat
router.delete('/:id', withAuth, (req, res) => {
    Chat.destroy({ 
        where: {
            id: req.params.id
        }
    })
        .then(dbChatData => {
            if(!dbChatData) {
                res.status(404).json({ message: 'No chat found with this ID.' })
                return;
            };

            res.json(dbChatData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;