const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Chat extends Model {}

Chat.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    recipient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'user',
            key:'id'
        }
    }
},
{
    sequelize, 
    freezeTableName: true,
    underscored: true,
    modelName: 'chat'
}
);

module.exports = Chat;

