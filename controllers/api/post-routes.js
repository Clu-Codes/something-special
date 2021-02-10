const router = require('express').Router();
const { Post, User, Message } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req,res) => {
    Post.findAll({
        attributes:[
            'id',
            'title',
            'price',
            'description'
        ],
        include: [
            {
                model: Message,
                attributes: ['message_text'],
                include: {
                    model: User,
                    attributes:['username']
                }
            },
            {
                model:User,
                attributes:['username']
            }
        ]
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id:req.params.id
        },
        attributes: [
            'id',
            'title',
            'price',
            'description'
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
                attributes:['username']
            }
        ]
    })
    .then(postData => {
        if(!postData) {
            return res.status(404).json({message: 'No post foundt with this id'});
        }
        return res.json(postData);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json(err);
    });
});

router.post('/', withAuth, (req,res) => {
    Post.create({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        user_id: req.session.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        return res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req,res) => {
    Post.update(
        {
           title: req.body.title,
           description: req.body.description,
           price: req.body.price
        },
        {
            where:{
                id: req.params.id
            }
        }
    )
    .then(postData => {
        if(!postData) {
            return res.status(404).json({message: 'No post found with that id'});
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(postData => {
        if(!postData) {
           return res.status(404).json({ message: 'No post with that id found.'});
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;