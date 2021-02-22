const router = require('express').Router();
const { PostTag, Post } = require('../../models');

// get all PostTags
router.get('/',  (req, res) => {
    PostTag.findAll({
        include: ['id', 'post_id', 'tag_id']
    })
    .then(dbPostTagData => {
        return res.json(dbPostTagData)
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

// get single PostTag by ID
router.get('/:id', (req, res) => {
    PostTag.findOne({
        where: {
            id: req.params.id
        },
        include: ['id', 'post_id', 'tag_id']
    })
    .then(dbPostTagData => {
        if (!dbPostTagData) {
            return res.status(404).json({ message: 'No PostTag with that id was found! '})
        };
        return res.json(dbPostTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create new PostTag
router.post('/', (req, res) => {
    PostTag.findOrCreate({
        where: {
            post_id: req.body.post_id,
            tag_id: req.body.tag_id
        }
    })
    .then(dbPostTagData => res.json(dbPostTagData))
    .catch(err => {
        console.log(err)
        return res.status(500).json(err);
    });
});

// delete PostTag
router.delete('/:id', (req, res) => {
    PostTag.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostTagData => {
        if (!dbPostTagData) {
            return res.status(404).json({ message: 'No PostTags with that ID exists.' })
        };
        return res.json(dbPostTagData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

module.exports = router;