const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')

const { User, Post, Suggestion } = require('../data/models')

/**
 * Deletes a post
 * 
 * @param {string} userId The user id 
 * @param {string} postId The post id
 * 
 * @returns {Promise} A Promise that resolves when a post is deleted successfully, or rejects with an error message if deletion fails
 * 
 * @throws {TypeError} On non-string user id or post id
 * @throws {ContentError} On user id or post id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or post
 */

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    await User.updateMany(
      { favs: { $in: postId }},
      { $pull: { favs: postId }}
    )
    
    await User.updateMany(
      { seenLately: { $in: postId }},
      { $pull: { seenLately: postId }}
    )

    await Suggestion.deleteMany({ post: postId })

    await Post.deleteOne({ _id: postId })
  })()
}