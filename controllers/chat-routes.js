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
        
        res.render('feed', { 
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



// router.get('/direct-message/:id', (req,res) => {
//     Category.findAll({
//         attributes: [
//             'id',
//             'category_name'
//         ]
//     })
//     .then(categoryData => {
//         const categories = categoryData.map(category => category.get({ plain: true}));
        

//     Post.findOne({
//         where: {
//             id:req.params.id
//         },
//         attributes: [
//             'id',
//             'title',
//             'price',
//             'description',
//             'image_url'
//         ],
//         include: [
//             {
//                 model: Message,
//                 attributes: ['message_text'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: User,
//                 attributes:['id','username']
//             },
//             {
//                 model: Category,
//                 attributes: ['category_name']
//             },
//             {
//                 model:Chat,
//                 attributes:['id','post_id','user_id', 'recipient'],
//                 include: [{
//                     model: User,
//                     attributes:['username']
//                 },
//                 {
//                     model: Post,
//                     attributes:['title']
//                 }]
//             }
//         ]
//     })
//     .then(postData => {
//         if(!postData) {
//             return res.status(404).json({message: 'No post found with this id'});
//         }
  
//                 // serialize the data and pass to template
//                 const post = postData.get({ plain: true });
                
//                 res.render('direct-message', {
//                     categories, 
//                     post,
//                     username: req.session.username,
//                     loggedIn: req.session.loggedIn,
//                     user_id: req.session.user_id
//                 });
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json(err);
//             });
//     });
// });

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
        chat = dbChatData.get({ plain: true})
        console.log(chat)
    });
        
        

        res.render('feed', { 
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


module.exports = router;