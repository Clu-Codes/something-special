const router = require('express').Router();
const { Chat, User, Post, Message, Category } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, (req, res) =>{
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
        recipient: req.session.user_id
    },
    attributes: [
        'id',
        'chat_text',
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
        }
    ] 
    })
    .then(chatData => {
        console.log(chatData);
        const chats = chatData.map(chat => chat.get({ plain: true}));
        
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



router.get('/direct-message/:id', (req,res) => {
    Category.findAll({
        attributes: [
            'id',
            'category_name'
        ]
    })
    .then(categoryData => {
        const categories = categoryData.map(category => category.get({ plain: true}));
        

    Post.findOne({
        where: {
            id:req.params.id
        },
        attributes: [
            'id',
            'title',
            'price',
            'description',
            'image_url'
        ],
        include: [
            {
                model: Message,
                attributes: ['message_text'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes:['id','username']
            },
            {
                model: Category,
                attributes: ['category_name']
            },
            {
                model:Chat,
                attributes:['id','post_id','user_id','chat_text', 'recipient'],
                include: [{
                    model: User,
                    attributes:['username']
                },
                {
                    model: Post,
                    attributes:['title']
                }]
            }
        ]
    })
    .then(postData => {
        if(!postData) {
            return res.status(404).json({message: 'No post found with this id'});
        }
  
                // serialize the data and pass to template
                const post = postData.get({ plain: true });
                
                res.render('direct-message', {
                    categories, 
                    post,
                    username: req.session.username,
                    loggedIn: req.session.loggedIn
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });
});


module.exports = router;