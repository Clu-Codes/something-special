const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection') ;

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [4, 1000]
            }
        },
        // NEED TO ADD IMAGE/UPLOAD CONFIG, REF UPLOAD MODEL
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        // tags go here 
        // tags_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'tags',
        //         key:'id'
        //     }
        // }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;