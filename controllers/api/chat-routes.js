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

// create chat
router.post('/', withAuth, (req,res) => {
    Category.findAll({
        attributes: [
            'id',
            'category_name'
        ]
    })
    .then(categoryData => {
        const categories = categoryData.map(category => category.get({ plain: true}));

        Chat.findOrCreate({
            where: 
            {
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            recipient: req.body.recipient
            }
        })
        .then(dbChatData => {
        const chats = dbChatData
        
            Chat.findOne({
                where:{
                id: chats[0].id,
            },
            attributes: [
                'id',
                'post_id',
                'user_id',
                'recipient'
            ],
            include:[
                {
                    model:User,
                    attributes:['id','username']
                },
                {
                    model:Post,
                    attributes:['id','title']
                },
                {
                    model:Text,
                    attributes:['id', 'chat_text', 'updated_at'],
                    include: {
                        model:User,
                        attributes:['username']
                    }
                }
            ] 
            })
            .then(dbChatData => {
                const chat = dbChatData.get({ plain: true });
                
                res.render('chat', { 
                    chat,
                    categories,
                    user_id: req.session.user_id,
                    username: req.session.username,
                    loggedIn: true
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        });
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