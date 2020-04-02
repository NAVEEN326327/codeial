const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async (req, res) => {

    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
                
            });


            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email').execPopulate();
            commentsMailer.newComment(comment);
            //  2nd part after JS file for AJAX comment 
            if(req.xhr){

                
                return res.status(200).json({   // returns JSON with status
                    data: {
                        comment: comment
                    },
                    message: "Comment Created"
                });
            }

            req.flash('success', 'comment made!');


            res.redirect('/');
        }
    } catch (err) {
        req.flash('success', 'Error in creating comment!');

        return res.redirect('back');

    }
}


module.exports.destroy = async (req, res) => {

    try {
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, {
                $pull:
                    { comments: req.params.id }
            });
            req.flash('success', 'comment deleted!');

            return res.redirect('back');

        } else {
            return res.redirect('back');
        }


    } catch (err) {
        req.flash('success', 'Error in deleting comment!');

        return res.redirect('back');
    }


}