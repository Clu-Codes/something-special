var stream = require('getstream-node');

var tweetSchema = Schema({
  text    : String,
  user   : { type: Schema.Types.ObjectId, ref: 'User' }
});

tweetSchema.plugin(stream.mongoose.activity);

// register your mongoose connection with the library
stream.mongoose.setupMongoose(mongoose);