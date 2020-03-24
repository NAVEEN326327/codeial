{

    // method to submit the form data for new post using AJAX
    let createPost = () => {
        let newPostForm = $('#new-post-form');

        newPostForm.submit((e) => {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: (data) => {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container ').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error: (error) => {
                    console.log(error.responseText);
                }
            });
        });

    }

    // method to create a post in DOM
    let newPostDom = (post) => {
        return $(`

        <div id="post-${post._id}">
            <div>
        
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${ post._id } ">X</a>
                </small>

                <h5>
                    ${ post.content}
        
                </h5>
            </div>
            <div>
                <h5><b> Name: </b>
                    ${ post.user.name}
        
                </h5>
        
            </div>
        
            <div class="post-comment">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add comment...." required>
                    <input type="hidden" name="post" value="${ post._id}">
                    <input type="submit" value="Add comment">
                </form>
        
                <div class="post-commnets-list">
                    <ul id="post-comments-${post._id} ">
                      
                    </ul>
                </div>
        
            </div>
        </div>`)
    }

    //  method to delete a post from DOM
    let deletePost = (deleteLink)=>{
        $(deleteLink).click((e)=>{
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: (data)=>{
                    $(`#post-${data.data.post_id}`).remove();
                }, error: (error)=>{
                    console.log(error.responseText);
                }
            });
        });
    }


    

    createPost();
}