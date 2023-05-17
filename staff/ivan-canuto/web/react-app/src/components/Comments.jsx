import retrievePost from "../logic/retrievePost"
import { context } from "../ui"
import createComment from "../logic/createComment"
import { useState } from "react"
import retrieveUser from "../logic/retrieveUser"
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
          alert(error.stack)

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
    let post;
    const comments = post.comments
    let user;

    retrievePost(context.userId, post.id, (error, _post) => {
      if (error) {
        alert(error)
        console.log(error)

        return
      }

      post = _post
    })
    
    retrieveUser(post.author, (error,_user) => {
      if (error) {
        alert(error)
        console.log(error)

        return
      }

      user= _user
    })

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


