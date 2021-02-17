const User = require('../../models/User');
const sequelize = require('../../config/connection');

const userData = [];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;