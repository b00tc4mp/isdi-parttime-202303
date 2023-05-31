import createComment from "../logic/createComment"
import { useState } from "react"
import deleteComment from "../logic/deleteComment"
import Comment from "./Comment"
import './components-styles/Comments.css'
import Context from "../Context"
import { useContext } from "react"


export default function Comments({ onCloseCommentModal, handleRefreshPosts, post }) {
  const { alert, freeze, unfreeze } = useContext(Context)

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
      freeze()

      createComment(commentText, post, (error) => {
        unfreeze()
        
        if(error) {
          alert(error.message, 'error')
          console.debug(error.stack)

          return
        }
        
        toggleAddComment()
      })

    } catch(error) {

      alert(error)
      console.debug(error.stack);
    }
  }
  
  const handleDeleteComment = (post, commentId) => {
    try{
      freeze()

      deleteComment(post, commentId, (error) => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')
          console.debug(error.stack)

          return
        }
        
        handleRefreshPosts()
      })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack)
    }
  }

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
        <div className="add-comment container" onClick={(event) => {
          if(event.target === document.querySelector('.add-comment'))
            toggleAddComment()
        }}>
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
        <button className="add-comment_button" onClick={toggleAddComment}>Add comment</button>
      }
    </section>
  </>
}
