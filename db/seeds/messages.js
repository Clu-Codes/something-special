const Message = require('../../models/Message');
const sequelize = require('../../config/connection');

const messageData = [
    {
        message_text: 'Is this still available?', 
        user_id: 1,
        post_id: 2
    },
    {
        message_text: 'Would you do $80 for all?',
        user_id: 2,
        post_id: 4
    },
    {
        message_text: 'How many runners do you have?',
        user_id: 3,
        post_id: 1
    },
];

const seedMessages = () => Message.bulkCreate(messageData);

module.exports = seedMessages;