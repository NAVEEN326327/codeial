const nodemailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside newComment mailer', comment);

    nodemailer.transporter.sendMail({
        from: 'nks326327@gmail.com',
        to: comment.user.email,
        subject: "New COmment published",
        html: '<h1>yup, your comment is now published!</h1>'
    },
    (err, info)=>{
        if(err){
            console.log('error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return ;
    });
}