module.exports.profile = function(err,res){
    // res.end('<h1>User Profile</h1>');
    return res.render('profile', {
        title: "Profile Page"
    });
}