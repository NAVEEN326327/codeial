const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, 
 (req, email,password, done)=>{  // done is a callback funtion
     // find a user and establish the identity
     User.findOne({email: email}, (err,user)=>{
         if(err){
            //  console.log("Error in finding user --> Passport");
            req.flash('error', err); 
            return done(err);
         }
         if(!user || user.password != password){
            //  console.log("Invalid Username/password");
           req.flash('error', 'Invalid Username/Password');
            return done(null, false);
         }

         return done(null, user);
     })
 }
));

// Serializing the user to decide which key is to be kept  in the cookies
passport.serializeUser((user,done)=>{
     done(null, user.id);
});


// Deserializing the user from the key in the cookies
passport.deserializeUser((id, done)=>{
    User.findById(id, function(err, user){
if(err){
    console.log("Error in finding user --> Passport");
    return done(err);
}
return done(null, user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = (req, res, next)=>{
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    //  if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session and we are just sending this to the locals for views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;