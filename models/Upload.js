const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

var admin = require('firebase-admin');
var app = admin.initializeApp();

class Upload extends Model {

}

Upload.init(
    {
      // TABLE COLUMN DEFINITIONS GO HERE
    },
    {
      // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
  
      // pass in our imported sequelize connection (the direct connection to our database)
      sequelize,
      // don't automatically create createdAt/updatedAt timestamp fields
      timestamps: false,
      // don't pluralize name of database table
      freezeTableName: true,
      // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
      underscored: true,
      // make it so our model name stays lowercase in the database
      modelName: 'user'
    }
  );


app.use((req, res) => {
    res.status(404).render("404page", {title:"404 not found",
    uploadstyle: `<link rel="stylesheet" href="/public/stylesheets/upload.css">`});
});


module.exports = Upload;