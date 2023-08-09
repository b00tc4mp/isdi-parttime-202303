const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../data/models')

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

      post.author.id = post.author._id
      delete post._id
    })

    return posts.reverse()
  })()
}
