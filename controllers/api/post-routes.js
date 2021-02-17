const router = require('express').Router();
const { Post, User, Message, Category } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
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
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['category_name']
            }
        ]
    })
    .then(postData => {
        res.json(postData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get single post by post ID
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'price',
            'description',
            'image_url'
        ],
        include: [{
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
        }]
    })
    .then(postData => {
        if (!postData) {
            return res.status(404).json({
                message: 'No post found with this id'
            });
        };
        return res.json(postData);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json(err);
    });
});

// create new post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category_id: req.body.category_id,
        user_id: req.session.user_id,
        image_url: req.body.image
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        return res.status(500).json(err);
    });
});

// update post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category_name,
        price: req.body.price
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            return res.status(404).json({
                message: 'No post found with that id'
            });
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            return res.status(404).json({
                message: 'No post with that id found.'
            });
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;