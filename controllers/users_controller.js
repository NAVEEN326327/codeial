module.exports.profile = (err,res) => {
    // res.end('<h1>User Profile</h1>');
    return res.render('profile', {
        title: "Profile Page"
    });
}

// user section followed by user signup
//render the sign up page
module.exports.signUp = (req,res)=>{
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

// render signIn page 
module.exports.signIn = (req,res)=>{
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = (req,res)=> {
    // TODO
}

module.exports.createSession = (req,res)=> {
    // TODO
}