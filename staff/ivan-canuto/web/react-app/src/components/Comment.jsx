import { context } from "../ui"

export default function Comment({ post, comment, handleDeleteComment }) {

  return <div className="comment">
  <div>
    <span className="comment-author">{comment.author}</span>: {comment.text}
  </div>
  {comment.authorId === context.userId && <span className="material-symbols-outlined delete-comment_icon" onClick={() => handleDeleteComment(post, comment.id)}>delete</span>}
</div>
}