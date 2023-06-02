import { validateCallback, validateId } from "./helpers/validators"
import { savePost, findPostById } from "../data"

/**
 * Deletes a user's comment
 * 
 * @param {string} postId The post's id
 * @param {string} commentId The comment's id
 * @param {function} callBack A functio, to catch the errors and shows them to the user
 */

export default function deleteComment(postId, commentId, callBack) {
  validateId(commentId, 'comment id')
  validateCallback(callBack)

  findPostById(postId, (post) => {
    const _post = post
    const comments = _post.comments
    const commentIndex = comments.findIndex(comment => comment.id === commentId)

    comments.splice(commentIndex, 1)
    savePost(_post, () => callBack(null))
  })
}