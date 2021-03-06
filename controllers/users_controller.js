const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        // res.end('<h1>User Profile</h1>');
        return res.render('profile', {
            title: "Profile Page",
            profile_user: user

        });
    })
}

module.exports.update = async (req, res) => {
   

    if (req.user.id == req.params.id) {

        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, (err)=>{
                if(err) {console.log('*******Multer Error: ', err)}

               user.name = req.body.name;
               user.email = req.body.email;

               if(req.file){


                if(user.avatar){
                   fs.unlinkSync(path.join(__dirname, '..', user.avatar));     // deleting file
                }

                //   this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
               }
               user.save();
               return res.redirect('back');

            })

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }

    } else {
        req.flash('error', 'Unauthorized!');
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