const User = require('../../models/User');
const sequelize = require('../../config/connection');

const userData = [
    {
        username: 'johncena', 
        email: 'johncena@email.com',
        password: 'password'
    },
    {
        username: 'testaccount', 
        email: 'test@email.com', 
        password: 'password'
    },
    {
        username: 'lernantino', 
        email: 'lernantino@email.com', 
        password: 'password'
    },
    {
        username: 'deckiedevs', 
        email: 'deckiedevs@email.com', 
        password: 'password'
    },
    {
        username: 'clucodes', 
        email: 'clucodes@email.com', 
        password: 'password'
    },
    {
        username: 'elysiayn', 
        email: 'elysiayn@email.com', 
        password: 'password'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;