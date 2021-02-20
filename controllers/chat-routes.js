const router = require('express').Router();
const { Chat, User, Post, Message, Category, Text } = require('../models');
const withAuth = require('../utils/auth');
const {Op} = require('sequelize');

router.get('/:id', withAuth, (req, res) =>{
    Category.findAll({
        attributes: [
            'id',
            'category_name'
        ]
    })
    .then(categoryData => {
        const categories = categoryData.map(category => category.get({ plain: true }));

        Chat.findOne({
            where:{
            id: req.params.id
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
                attributes:['id','title'],
                include: {
                    model: User,
                    attributes:['username']
                }
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

module.exports = router;