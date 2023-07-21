const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
// const { mongoose: { Types: { ObjectId } } } = require('mongoose')

const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId, '-__v -likes -date').lean()
    if(!post) throw new ExistenceError('Post not found.')

    post.id = post._id.toString()
    delete post._id

    post.author = {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    }

    return post
  })()
}