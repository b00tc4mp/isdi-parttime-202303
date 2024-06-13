const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')
const { User, Post } = require('../data/models')

/**
 * Sets and unsets a post as saved/favorite by the user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * 
 * @returns {Promise} A Promise that resolves when a post is saved/unsaved as favorite successfully, or rejects with an error message if the operation fails
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

    let favsFromUser = user.favs.map(fav => fav.toString())

    if(favsFromUser.includes(postId))
      await User.updateOne(
        { _id: userId },
        { $pull: { favs: new ObjectId(postId) }}
      )
    else
      await User.updateOne(
        { _id: userId },
        { $push: { favs: new ObjectId(postId) }}
      )
  })()
}