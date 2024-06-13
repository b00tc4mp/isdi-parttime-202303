const { validators: { validateId }, errors: { ExistenceError } } = require('com')
const { User, Post } = require('../data/models')

/**
 * Retrieves the posts made by the current user
 * 
 * @param {string} userId The user id 
 * @param {string} requestedUserId The requested user id 
 * 
 * @returns {Promise<array>} The array of posts
 * 
 * @throws {TypeError} On non-string user id or requested user id
 * @throws {ContentError} On user id or requested user id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or requested user
 */

module.exports = function retrieveUserPosts(userId, requestedUserId) {
  validateId(userId, 'user id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const posts = await Post.find({ author: requestedUserId }).populate('author', '-favs -__v').lean()

    posts.forEach(post => {
      post.id = post._id.toString()
      delete post._id

      post.fav = user.favs.some(fav => fav.toString() === post.id)
      post.liked = post.likes.some(like => like.toString() === user.id)

      if(post.author._id) {
        post.author.id = post.author._id.toString()
        delete post.author._id
      }
    })

    return posts.reverse()
  })()
}
