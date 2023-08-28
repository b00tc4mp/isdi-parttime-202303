const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../data/models')

/**
 * Retrieves all posts from database
 * 
 * @param {string} userId The user id 
 * 
 * @returns {Promise<array>} The array of posts
 * 
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On user id length not equal to 24 characters
 * @throws {ExistenceError} On non-existing user
 */

module.exports = (userId) => {
  validateId(userId, 'user id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const posts = await Post.find().populate('author', 'name avatar').lean()

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
