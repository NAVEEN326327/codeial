const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');



app.use(sassMiddleware({
    src: '/assests/scss', 
    dest: '/assets/css',
    debug: true,
    
}))
app.use(express.urlencoded());

app.use(cookieParser());

////////////        for styling and structure part ///////////////
app.use(express.static('./assets')); 
app.use(expressLayouts); 

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployement in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) // time in mili second
    },
    // Storing session permanently until session get expired from browser
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, (err)=>{
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});