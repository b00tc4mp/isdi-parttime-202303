const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../data/models')

/**
 * Sets a post as private or public by the user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * 
 * @returns {Promise} A Promise that resolves when a post is set as private/public successfully, or rejects with an error message if the operation fails
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

    if(post.visible)
      await Post.updateOne(
        { _id: postId },
        { $set: { visible: false }}
      )
    else
      await Post.updateOne(
        { _id: postId },
        { $set: { visible: true }}
      )
  })()
}