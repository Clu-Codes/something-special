const Message = require('../../models/Message');
const sequelize = require('../../config/connection');

const messageData = [];

const seedMessages = () => Message.bulkCreate(messageData);

module.exports = seedMessages;