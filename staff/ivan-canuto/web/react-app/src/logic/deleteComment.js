import { validateId } from "./helpers/validators"
import { savePost } from "../data"

/**
 * Deletes user's comment
 * 
 * @param {object} post The post's object from database
 * @param {string} commentId The comment's id
 */

export default function deleteComment(post, commentId) {
  validateId(commentId, 'comment id')

  const _post = post
  const comments = _post.comments
  const commentIndex = comments.findIndex(comment => comment.id === commentId)

  comments.splice(commentIndex, 1)
  savePost(_post)
}