const router = require('express').Router();
const { Post, User, Message, Category } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Category.findAll({
            attributes: [
                'id',
                'category_name'
            ]
        })
        .then(categoryData => {
            const categories = categoryData.map(category => category.get({ plain: true}));
            
            Post.findAll({
            where:{
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'description',
                'price',
                'created_at',
                'image_url'
            ],
            include: [
                {
                    model: Message,
                    attributes: ['id', 'message_text', 'post_id', 'user_id', 'created_at'],
                    include:{
                        model: User,
                        attributes:['username']    
                    }
                },
                {
                    model: User,
                    attributes:['username']
                },
                {
                    model: Category,
                    attributes:['id','category_name']
                }
            ]
        })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true}));

            res.render('dashboard', { 
                posts, 
                categories, 
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

router.get('/edit/:id', withAuth, (req,res) => {
    Category.findAll({
        attributes: [
            'id',
            'category_name'
        ]
    })
    .then(categoryData => {
        const categories = categoryData.map(category => category.get({ plain: true}));
            
        Post.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'description',
                'price',
                'created_at',
                'image_url'
            ],
            include: [
                {
                    model: Message,
                    attributes: ['id', 'message_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(userData => {
            
            if(userData) {
                const post = userData.get({ plain: true});
                
                return res.render('edit-posts', {
                    post,
                    categories,
                    username: req.session.username,
                    loggedIn: true
                });
            } else {
                return res.status(404).end();
            }
        })
        .catch(err => {
            return res.status(500).json(err);
        });
    });
});

module.exports = router;