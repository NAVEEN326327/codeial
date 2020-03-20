const User = require('../models/user');

module.exports.profile = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        // res.end('<h1>User Profile</h1>');
        return res.render('profile', {
            title: "Profile Page",
            profile_user: user

        });
    })
}

module.exports.update = (req,res)=>{
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, (err, user)=>{
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unautherized');
    }

}

// user section followed by user signup
//render the sign up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');  // if user already signin
    }

    return res.render('user_sign_up', {

        title: "Codeial | Sign Up"
    })
}

// render signIn page 
module.exports.signIn = (req, res) => {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');  // if user already signin
    }

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
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');

}

module.exports.destroySession = (req, res) => {
    req.logout();
    req.flash('success', 'you have logged out!');

    return res.redirect('/');
}