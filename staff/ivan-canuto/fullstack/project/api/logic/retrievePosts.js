const {
  validators: { validateId, validateText },
  errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../data/models')

/**
 * Retrieves all posts or the posts selected by subject from database
 * 
 * @param {string} userId The user id 
 * @param {string} postSubject The subject related to the posts
 * 
 * @returns {Promise<array>} The array of posts
 * 
 * @throws {TypeError} On non-string user id or subject
 * @throws {ContentError} On user id not equal to 24 characters of length or not hexadecimal or empty subject field
 * @throws {ExistenceError} On non-existing user
 */

module.exports = (userId, postSubject) => {
  validateId(userId, 'user id')
  validateText(postSubject, 'subject')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    let posts
    
    if(postSubject === 'Show all')
      posts = await Post.find().populate('author', 'name avatar').lean()
    else
      posts = await Post.find({ subject: postSubject }).populate('author', 'name avatar').lean()

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
