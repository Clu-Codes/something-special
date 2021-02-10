const Post = require('../../models/Post');
const sequelize = require('../../config/connection');

const postData = [
    {
        title: 'Table Runners', 
        price: 10, 
        description:'Blush pink table runners', 
        user_id: 2, 
        category_id: 5
    },
    {
        title: 'Floral Lanterns', 
        price: 20, 
        description:'Floral lantern centerpieces', 
        user_id: 3, 
        category_id: 2
    },
    {
        title: 'Foldable Chairs', 
        price: 15, 
        description: 'White folding chairs', 
        user_id: 5, 
        category_id: 3
    },
    {
        title: 'Gold Chargers', 
        price: 1, 
        description: '100 Gold Chargers', 
        user_id: 2, 
        category_id: 8
    },
    {
        title: 'Fairy Lights', 
        price: 15, 
        description: '20 Fairy Light Strings',
        user_id: 6,
        category_id: 4
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;