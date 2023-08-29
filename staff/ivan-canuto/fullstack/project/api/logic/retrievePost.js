const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')

const { User, Post } = require('../data/models')

/**
 * Retrieves the requested post by post id
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * 
 * @returns {Promise<object>} The post object
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

    const post = await Post.findById(postId, '-__v').populate('author', 'name avatar').lean()
    if(!post) throw new ExistenceError('Post not found.')

    post.id = post._id.toString()
    delete post._id

    post.author.id = post.author._id.toString()
    delete post.author._id

    post.fav = user.favs.some(fav => fav.toString() === post.id)
    post.liked = post.likes.some(like => like.toString() === user.id)

    post.comments.forEach(comment => {
      comment.id = comment._id
      delete comment._id
    })

    return post
  })()
}