import { validateId } from "./helpers/validators"
import { savePost } from "../data"

export default function deleteComment(post, commentId) {
  validateId(commentId, 'comment id')

  const _post = post
  const comments = post.comments
  const commentIndex = comments.findIndex(comment => comment.id === commentId)

  comments.splice(commentIndex, 1)
  savePost(_post)
}