const router = require('express').Router();
const { Post, User, Message, Category } = require('../models');
const { Op } = require('sequelize');

router.get('/:term', (req, res) => {
    // gets all categories to populate main.handlebars side panel
    Category.findAll({
        attributes: [
            'id',
            'category_name'
        ]
    })
        .then(categoryData => {
            const categories = categoryData.map(category => category.get({ plain: true }));
                
            Post.findAll({
                where: {
                    [Op.or]: [
                        { 
                            'title': { [Op.like]: `%${req.params.term}%` } 
                        },
                        { 
                            'description': { [Op.like]: `%${req.params.term}%` } 
                        }
                    ]
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
                        attributes: ['message_text'],
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
            .then(postData => {
                const posts = postData.map(post => post.get({ plain: true}));
                res.render('homepage', { 
                    categories,
                    posts,
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