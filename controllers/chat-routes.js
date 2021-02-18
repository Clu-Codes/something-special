const router = require('express').Router();
const { Chat, User, Post, Message, Category, Text } = require('../models');
const withAuth = require('../utils/auth');
const {Op} = require('sequelize');

router.get('/', withAuth, (req, res) =>{
  // gets all categories to populate main.handlebars side panel
  Category.findAll({
        attributes: [
        'id',
        'category_name'
        ]
    })
        .then(categoryData => {
            const categories = categoryData.map(category => category.get({ plain: true}));
    

    Chat.findAll({
        where:{
            [Op.or]: [{recipient: req.session.user_id}, {user_id:req.session.user_id}]
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
                attributes:['chat_text'],
                group: ['chat_id'] 
            }    
        ] 
    })
        .then(dbChatData => {
            
            const chats = dbChatData.map(chat => chat.get({ plain: true}));
            console.log(chats);
            res.render('feed', { 
                    chats,
                    categories,
                    user_id: req.session.user_id,
                    username: req.session.username,
                    loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});
});

router.get('/:id', withAuth, (req, res) =>{
    Category.findAll({
        attributes: [
            'id',
            'category_name'
        ]
    })
    .then(categoryData => {
        const categories = categoryData.map(category => category.get({ plain: true}));



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
        const chat = dbChatData.get({ plain: true});
        
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
    })
});
});


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
        console.log(chats[0].id)
    
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
        const chat = dbChatData.get({ plain: true});
        
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
    })
});
});
});


module.exports = router;