const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (req, res) => {

    try {
       let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
                
            });

        }
        req.flash('success', 'Post published!');

        return res.redirect('back');
    } catch (err) {
        req.flash('success', 'Error Occured on publishing post!');
        return res.redirect('back');
        
    }


}


module.exports.destroy = async (req, res) => {

    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
        
//  AJAX for deleting post
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted"
            });
        }
// ////////////////////////////////////
            req.flash('success', 'Post and associated comments deleted!');
            return res.redirect('back');
        } else {
            req.flash('success', 'You can not delete this post');

            return res.redirect('back');
        }
    } catch (err) {

        req.flash('error', err);
        return res.redirect('back');

    }

}