const Chat = require('../models/chat');

module.exports.create = async (req,res) => {

    try{
        let post = await Chat.create({
            content: req.body.content,
            user: req.user._id
        });
         
        if(req.xhr){
            return res.status(200).json({
                data: {
                    msg : msg
                },
            
            });
        }
        
        return res.redirect('back');

    } catch(err){
        return res.redirect('back');
    }

}