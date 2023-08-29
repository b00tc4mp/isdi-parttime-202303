const { validators: { validateId }, errors: { ExistenceError } } = require('com')
const { User, Post } = require('../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

/**
 * Saves a post as seen by the user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * 
 * @returns {Promise} A Promise that resolves when a post is saved as seen successfully, or rejects with an error message if the operation fails
 * 
 * @throws {TypeError} On non-string user id or post id
 * @throws {ContentError} On user id or post id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or post
 */

module.exports = function savePostAsSeen(userId, postId) {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    const foundPostIndex = user.seenLately.findIndex(post => post.toString() === postId)

    if(foundPostIndex !== -1) {
      user.seenLately.splice(foundPostIndex, 1)

      user.seenLately.unshift(new ObjectId(postId))
    }
    else {
      if(user.seenLately.length === 15) user.seenLately.pop()
      
      user.seenLately.unshift(new ObjectId(postId))
    }

    await user.save()
  })()
}
