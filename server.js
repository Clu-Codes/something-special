const express = require('express');
const routes =  require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const stream = require('getstream');

const app = express();
const PORT = process.env.PORT || 3001;

const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {}, 
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const client = stream.connect(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
)

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes)

// turn on connection to db and server 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});