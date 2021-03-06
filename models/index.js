const Category = require('./Category');
const Message = require('./Message');
const Post = require('./Post');
const User = require('./User');
const Chat = require('./Chat');
const Text = require('./Text');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.belongsTo(Category, {
    foreignkey: 'category_id'
});

Category.hasMany(Post, {
    foreignKey: 'category_id'
});

Post.hasMany(Message, {
    foreignKey: 'post_id'
});

Message.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Message, {
    foreignKey:'user_id'
});

Message.belongsTo(User, {
    foreignKey: 'user_id'
});

Chat.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Chat, {
    foreignKey: 'user_id'
});

Chat.belongsTo(Post, {
    foreignKey: 'post_id'
});

Post.hasMany(Chat, {
    foreignKey: 'post_id'
});

Text.belongsTo(Chat, {
    foreignKey: 'chat_id'
});

Chat.hasMany(Text, {
    foreignKey: 'chat_id'
});

Text.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Text, {
    foreignKey: 'user_id'
});

module.exports = { Category, Message, Post, User, Chat, Text };
