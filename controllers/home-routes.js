const router = require('express').Router();
const { Category, Message, Post, User } = require('../models');

router.get('/', (req, res) => {
    // if user is not logged in, they will be directed to login page
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    };

    // gets all categories to populate side panel menu
    Category.findAll({
        attributes: [
            'id',
            'category_name'
        ]
    })
    .then(categoryData => {
        const categories = categoryData.map(category => category.get({ plain: true}));

        // get all posts to populate main page
        Post.findAll({
            attributes: [
                'id',
                'title',
                'price',
                'description',
                'image_url',
                'created_at'
            ],
            include: [
                {
                    model: Message,
                    attributes: [
                        'id',
                        'message_text',
                        'user_id',
                        'post_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Category,
                    attributes: ['category_name']
                }
            ]
        })
        .then(dbPostData => {

            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('homepage', {
                posts,
                categories,
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


router.get('/post/:id', (req, res) => {
    // gets all cateogories to populate side panel menu
    Category.findAll({
        attributes: [
            'id',
            'category_name'
        ]
    })
    .then(categoryData => {
        const categories = categoryData.map(category => category.get({ plain: true }));
        
        // gets selected post
        Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'price',
                'description',
                'image_url',
                'created_at'
            ],
            include: [
                {
                    model: Message,
                    attributes: [
                        'id',
                        'message_text',
                        'user_id',
                        'post_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Category,
                    attributes: ['category_name']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) { 
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            // serialize the data and pass to template
            const post = dbPostData.get({ plain: true });

            // identifies if the post belongs to the logged in user
            if (post.user.username === req.session.username) {
                post.myPost = true;
            }

            // identifies if the message belongs to the logged in user
            post.messages.forEach(message => {
                if (message.user.username === req.session.username) {
                    message.myMessage = true;
                }
            })
            
            res.render('single-post', { 
                post,
                categories,
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

router.get('/category/:category', (req, res) => {
    Category.findAll({
        attributes: [
            'id',
            'category_name'
        ]
    })
    .then(categoryData => {
        const categories = categoryData.map(category => category.get({ plain: true}));
            
        Post.findAll({
            where: {
                '$category_name$': req.params.category
            },
            attributes: [
                'id',
                'title',
                'price',
                'description',
                'image_url',
                'created_at'
            ],
            include: [
                {
                    model: Message,
                    attributes: [
                        'id',
                        'message_text',
                        'user_id',
                        'post_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Category,
                    attributes: ['category_name']
                }
            ]
        })
            .then(dbPostData => {
                if (!dbPostData) { 
                    res.status(404).json({ message: 'No post found with this id' });
                    return;
                }

                // serialize the data and pass to template
                const posts = dbPostData.map(post => post.get({ plain: true }));

                res.render('homepage', { 
                    posts,
                    categories,
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

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    };

    res.render('login');
});

router.get('/create-account', (req, res) => {
    res.render('create-user');
});

module.exports = router;