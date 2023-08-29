const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')

const { User, Post } = require('../data/models')

/**
 * Deletes a post comment
 * 
 * @param {string} userId The user id 
 * @param {string} postId The post id
 * @param {string} commentId The comment id
 * 
 * @returns {Promise} A Promise that resolves when a comment is deleted successfully, or rejects with an error message if deletion fails
 * 
 * @throws {TypeError} On non-string user id, post id or comment id
 * @throws {ContentError} On user id, post id or comment id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or post
 */

module.exports = (userId, postId, commentId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateId(commentId, 'comment id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    await Post.updateOne(
      { _id: postId },
      { $pull: { comments: { _id: commentId }}}
    )
  })()
}