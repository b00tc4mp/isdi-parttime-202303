const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

/**
 * Sets and unsets a post as liked by the user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * 
 * @returns {Promise} A Promise that resolves when as post is liked/unliked successfully, or rejects with an error message if the operation fails
 * 
 * @throws {TypeError} On non-string user id or post id
 * @throws {ContentError} On user id or post id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or post
 */

const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    let likesFromPost = post.likes.map(like => like.toString())

      if(likesFromPost.includes(userId))
        await Post.updateOne(
          { _id: postId },
          { $pull: { likes: new ObjectId(userId) }}
        )
      else
        await Post.updateOne(
          { _id: postId },
          { $push: { likes: new ObjectId(userId) }}
        )
  })()
}