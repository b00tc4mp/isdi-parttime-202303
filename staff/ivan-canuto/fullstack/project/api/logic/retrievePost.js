const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')

const { User, Post } = require('../data/models')

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

    post.author.id = post.author._id
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