const Category = require('../../models/Category');
const sequelize = require('../../config/connection');

const categoryData = [
    {
        category_name: 'Apparel'
    },
    {
        category_name: 'Centerpieces'
    },
    {
        category_name: 'Furniture'
    },
    {
        category_name: 'Lighting'
    },
    {
        category_name: 'Linens'
    },
    {
        category_name: 'Miscellaneous Decor'
    },
    {
        category_name: 'Serving Ware'
    },
    {
        category_name: 'Table Settings'
    }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;