const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const admin = require('firebase-admin');
const app = admin.initializeApp();




module.exports = Upload;