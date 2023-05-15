import retrievePost from "../logic/retrievePost"
import { context } from "../ui"
import createComment from "../logic/createComment"
import { useState } from "react"
import retrieveUser from "../logic/retrieveUser"
import deleteComment from "../logic/deleteComment"
import Comment from "./Comment"

export default function Comments(props) {

  const [addComment, setAddComment] = useState(false)

  const handleCloseCommentModal = () => {
    props.onCloseCommentModal()
  }

  const toggleAddComment = () => {
    setAddComment(!addComment)
  }

  const handleDeleteComment = (post, commentId) => {
    deleteComment(post, commentId)
    props.handleRefreshPosts()
  }

  function handleCreateComment(event) {
    event.preventDefault()

    const commentText = event.target.commentText.value

    try {
      createComment(commentText, props.post)
      toggleAddComment()

    } catch(error) {

      alert(error)
      console.log(error.stack);
    }
  }

  try {
    const post = retrievePost(context.userId, context.postId)
    const comments = post.comments
    const user = retrieveUser(post.author)

  return <>
  <section className="comment-section">
    <div className="above-comments">
      <div>
        <img className="post-user-avatar" src={user.avatar} alt="post-user-avatar" />
        <p className="post-user-name">{user.name}</p>
      </div>
      <button className="return-to-post_button" onClick={handleCloseCommentModal}>Return</button>
    </div>

    <h2>Post comments</h2>

    <div className="comments">
      {comments.map(comment => <Comment
      key={comment.id}
      post={post}
      comment={comment}
      handleDeleteComment={handleDeleteComment}/>
      )}
    </div>
    
    {addComment ? 
    <form className="add-comment_form" onSubmit={handleCreateComment}>
      <textarea className="comment-text" cols="30" rows="10" name="commentText" autoFocus></textarea>
      <div>
        <button>Add</button>
        <button type="button" onClick={toggleAddComment}>Cancel</button>
      </div>
    </form>
    :
    <button className="add-comment_button" onClick={toggleAddComment}>Add comment</button>}
  </section>
  </>

  } catch(error) {
    alert(error)
    console.log(error.stack);
  }

}


