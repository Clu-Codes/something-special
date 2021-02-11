const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs 
// const firebase = require("firebase/app");
// Add the Firebase products that you want to use
// require("firebase/storage");
// require("firebase/database");
// require("firebase/firestore");
// require("firebase/functions");


// const firebaseConfig = {
//     apiKey: "AIzaSyASm4cl07BmTv1fJiraN-v9fTdv7TJj7W8",
//     authDomain: "something-special-60ad8.firebaseapp.com",
//     databaseURL: "https://something-special-60ad8-default-rtdb.firebaseio.com",
//     projectId: "something-special-60ad8",
//     storageBucket: "something-special-60ad8.appspot.com",
//     messagingSenderId: "454426394358",
//     appId: "1:454426394358:web:78e1b66239b850824f36d7",
//     measurementId: "G-TCN7D23BGW"
// };

  // Initialize Firebase
// firebase.initializeApp(firebaseConfig);




module.exports = Upload;