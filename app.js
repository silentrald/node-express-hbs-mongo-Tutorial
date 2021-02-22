// REQUIRES - To use the modules that was installed through npm
const express       = require('express');
const bodyParser    = require('body-parser');
const exphbs        = require('express-handlebars');
const session       = require('express-session');

require('dotenv').config();

const app = express();

// Make a constant
const PORT = 5000;

const SESSION_OPT = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: process.env.NODE_ENV === 'development'
    }
};

// INITIALIZE THE TEMPLATING ENGINE
app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: {
        '===': (arg1, arg2) => arg1 === arg2,
    }
}));
app.set('view engine', 'hbs');

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'));
}

app.use(session(SESSION_OPT));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTERS
const indexRtr = require('./routers/index');
const testRtr = require('./routers/test');
const userRtr = require('./routers/user');

// Route the paths to the routers
app.use('/', indexRtr);
app.use('/test', testRtr);
app.use('/user', userRtr);

// This will open the port to listen to any request from the user
app.listen(PORT, () => {
    // Just to verify if the server has been opened
    console.log(`Listening to port: ${PORT}`);
});