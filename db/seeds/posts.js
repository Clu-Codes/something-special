const Post = require('../../models/Post');
const sequelize = require('../../config/connection');

const postData = [];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;