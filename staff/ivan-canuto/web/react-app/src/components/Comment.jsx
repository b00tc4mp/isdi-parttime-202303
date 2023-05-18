import { context } from "../ui"
import './components-styles/Comment.css'


export default function Comment({ comment, post, handleDeleteComment }) {

  return <div className="comment">
  <div>
    <span className="comment-author">{comment.author}</span>: {comment.text}
  </div>
  {comment.authorId === context.userId && <span className="material-symbols-outlined delete-comment_icon" onClick={() => handleDeleteComment(post, comment.id)}>delete</span>}
</div>
}