const User = require('../models/user');

module.exports.profile = (err, res) => {
    // res.end('<h1>User Profile</h1>');
    return res.render('profile', {
        title: "Profile Page"
    });
}

// user section followed by user signup
//render the sign up page
module.exports.signUp = (req, res) => {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

// render signIn page 
module.exports.signIn = (req, res) => {
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = (req, res) => {
    if (req.body.password != req.body.confirm_password) {  // Working
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, (err, user) => {
                if (err) { console.log('error in creating user while signing up'); return }

                return res.redirect('/users/sign-in');

            });
        }
        else {
            return res.redirect('back');
        }

    });
}

module.exports.createSession = (req, res) => {

    // steps to authenticate

    //find the user
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) { console.log('error in finding user in signing in'); return }
        // handle user found
        if (user) {
            //handle password which doesn't match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        } else {
            // handle user not found

            return res.redirect('back');
        }

    });




}