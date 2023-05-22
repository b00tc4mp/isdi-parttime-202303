import createComment from "../logic/createComment"
import { useState } from "react"
import deleteComment from "../logic/deleteComment"
import Comment from "./Comment"
import './components-styles/Comments.css'


export default function Comments({ onCloseCommentModal, handleRefreshPosts, post }) {

  const [addComment, setAddComment] = useState(false)

  const handleCloseCommentModal = () => {
    onCloseCommentModal()
  }

  const toggleAddComment = () => {
    setAddComment(!addComment)
  }

  function handleCreateComment(event) {
    event.preventDefault()

    const commentText = event.target.commentText.value

    try {
      createComment(commentText, post, (error) => {
        if(error) {
          alert(error.message)
          console.log(error.stack)

          return
        }
        
        toggleAddComment()
      })

    } catch(error) {

      alert(error)
      console.log(error.stack);
    }
  }
  
  const handleDeleteComment = (post, commentId) => {
    try{
      
      deleteComment(post, commentId, (error) => {
        if (error) {
          alert(error)
          console.log(error.stack)

          return
        }
        
        handleRefreshPosts()
      })

    } catch (error) {
      alert(error)
      console.log(error.stack)
    }
  }

  try {

    return <>
    <section className="comment-section">
      <div className="above-comments">
        <div>
          <img className="post-user-avatar" src={post.author.avatar} alt="post-user-avatar" />
          <p className="post-user-name">{post.author.name}</p>
        </div>
        <button className="return-to-post_button" onClick={handleCloseCommentModal}>Return</button>
      </div>

      <h2>Post comments</h2>

      <div className="comments">
        {post.comments && post.comments.map(comment => <Comment
        key={comment.id}
        comment={comment}
        post={post}
        handleDeleteComment={handleDeleteComment}/>
        )}
      </div>
      
      {addComment ? 
      <div className="add-comment container">
        <form className="add-comment_form" onSubmit={handleCreateComment}>
        <h2>Add comment</h2>
          <textarea className="comment-text" cols="30" rows="10" name="commentText" autoFocus></textarea>
          <div className="add-comment_form_buttons">
            <button>Add</button>
            <button type="button" onClick={toggleAddComment}>Cancel</button>
          </div>
        </form>
      </div>
      :
      <button className="add-comment_button" onClick={toggleAddComment}>Add comment</button>}
    </section>
    </>

    } catch(error) {
      alert(error)
      console.log(error.stack);
    }
}
