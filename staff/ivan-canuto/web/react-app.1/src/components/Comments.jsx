import { retrievePosts } from "../logic/retrievePosts"
import { context } from "../ui"
import { users } from "../data"

export default function Comments(props) {

  function handleClickAddComment() {
    props.onClickAddComment()
  }

  function handleCancelAddComment() {
    props.onCancelAddComment()
  }

  function handleCreateComment(event) {
    event.prevendDefault()

    const commentText = event.target.commentText.value

    try {
      
      createComment(commentText)

    } catch(error) {

      alert(error)
      console.log(error.stack);
    }
  }

  const toggleAddCommentButton = props.addRemoveButton

  const posts = retrievePosts(context.userId)
  const post = posts.find(post => post.id === context.postId)
  const comments = post.comments
  const _users = users()
  const user = _users.find(user => user.id === post.author)

  return <section className="comment-section">
    <div className="above-comments">
      <div>
        <img className="post-user-avatar" src={user.avatar} alt="post-user-avatar" />
        <p className="post-user-name">{user.name}</p>
      </div>
      <button className="return-to-post_button">Return</button>
    </div>
    <h2>Post comments</h2>
    {comments.map(comment => <div className="comment">
      {comment.author}: {comment.text}
    </div>)}
    {toggleAddCommentButton ? <form className="add-comment_form" onSubmit={handleCreateComment}>
      <textarea className="comment-text" cols="30" rows="10" name="commentText"></textarea>
      <div>
        <button>Add</button>
        <button type="button" onClick={handleCancelAddComment}>Cancel</button>
      </div>
    </form>
    :
    <button className="add-comment_button" onClick={handleClickAddComment}>Add comment</button>}
  </section>
}