const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection') ;

class Post extends Model {
    static addTag(body, models) {
        return body.tagArr.forEach(tag => {
            models.PostTag.create({
                post_id: body.post_id,
                tag_id: tag
            }).then(() => {
                return Post.findOne({
                    where: {
                        id: body.post_id
                    },
                    attributes: [
                        'id',
                        'title',
                        'price',
                        'description',
                        'image_url'
                    ],
                    include: [
                        {
                            model: Message,
                            attributes: ['message_text'],
                            include: {
                                model: User,
                                attributes: ['username']
                            }
                        },
                        {
                            model: User,
                            attributes: ['username']
                        },
                        {
                            model: Category,
                            attributes: ['category_name']
                        },
                        {
                            model: Tag, 
                            as: 'tags',
                            attributes: ['id', 'tag_name'],
                            through: {
                                attributes: []
                            }
                        }
                    ]
                })
            })
        })
    }
}

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
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;