const router = require('express').Router();
const { Tag, Post } = require('../../models');

// get all tags
router.get('/',  (req, res) => {
    Tag.findAll({
        include: [
            {
                model: Post,
                as: 'posts',
                attributes: [
                'id',
                'title',
                'price',
                'description',
                'image_url'
                ],
                through: {
                    attributes: []
                }
            }
        ]
    })
    .then(dbTagData => {
        return res.json(dbTagData)
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

// get single tag by ID
router.get('/:id', (req, res) => {
    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                as: 'posts',
                attributes: [
                    'id',
                    'title',
                    'price',
                    'description',
                    'image_url'
                ]
            }
        ]
    })
    .then(dbTagData => {
        if (!dbTagData) {
            return res.status(404).json({ message: 'No tag with that id was found! '})
        };
        return res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create new tag
router.post('/', (req, res) => {
    Tag.findOrCreate({
        where: {
            tag_name: req.body.tag_name
        }
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err)
        return res.status(500).json(err);
    });
});

// delete tag
router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTagData => {
        if (!dbTagData) {
            return res.status(404).json({ message: 'No tags with that ID exists.' })
        };
        return res.json(dbTagData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

module.exports = router;