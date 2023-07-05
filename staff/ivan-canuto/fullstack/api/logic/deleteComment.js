const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { Schema: { Types: { ObjectId } } } = require('mongoose')
const { User, Post } = require('../data/models')

module.exports = (userId, postId, commentId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateId(commentId, 'comment id')

  return Promise.all([User.findById(userId), Post.findById(postId)])
    .then(([user, post]) => {
      if(!user) throw new ExistenceError('User not found.')
      if(!post) throw new ExistenceError('Post not found.')

      return Post.updateOne(
        { _id: new ObjectId(postId) },
        { $pull: { comments: { id: commentId }}}
      )
    })
}