const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
// const { mongoose: { Types: { ObjectId } } } = require('mongoose')

const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  return Promise.all([
    User.findById(userId),
    Post.findById(postId, '-__v -likes -date').lean()
  ])
    .then(([user, post]) => {
      if(!user) throw new ExistenceError('User not found.')

      if(!post) throw new ExistenceError('Post not found.')

      post.id = post._id.toString()
      delete post._id

      post.author = {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      }

      return post
    })
}