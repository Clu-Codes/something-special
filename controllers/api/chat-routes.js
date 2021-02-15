const router = require('express').Router();
const { Chat, User, Post, Message, Category } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/:id', withAuth, (req,res) => {
    Chat.create({
        user_id: req.session.user_id,
        chat_text: req.chat_text,
        recipient: req.post.user_id,
        post_id: req.post_id
    })
    .then(chatData => {
        if(!recipient) {
            return res.status(404).json({message: 'No user found with this id'});
        }
        return res.json(chatData);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json(err);
    });
});

module.exports = router;