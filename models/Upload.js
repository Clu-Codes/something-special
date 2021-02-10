var admin = require('firebase-admin');
var app = admin.initializeApp();

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


app.use((req, res) => {
    res.status(404).render("404page", {title:"404 not found",
    uploadstyle: `<link rel="stylesheet" href="/public/stylesheets/upload.css">`});
});


module.exports = Upload;