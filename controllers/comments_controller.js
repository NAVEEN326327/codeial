const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async (req, res) => {

    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
                
            });
            req.flash('success', 'comment made!');

            post.comments.push(comment);
            post.save();

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