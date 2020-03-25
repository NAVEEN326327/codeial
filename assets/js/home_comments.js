{
    // 1st part for sending commnet data using AJAX request

    // // method to submit the form data for new comment using AJAX
    let createComment = () => {
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit((e) => {
            e.preventDefault();  // I will stop default method of rendering

            $.ajax({
                type: 'post',    // type of form request --> post or get
                url: '/comments/create',
                data: newCommentForm.serialize(),  // converts post data to JSON
                success: (data) => {
            //         let newComment = newCommentDom(data.data.comment);
            //         $('.post-commnets-list ').prepend(newComment);
            //         // deletePost($(' .delete-post-button', newPost));
               console.log(data);
        }, error: (error) => {
                    console.log(error.responseText);
                }
            });
        });

    }
// method to create a comment in DOM


createComment();
}