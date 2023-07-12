const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
  validateId(postId, 'post id')
  validateId(userId, 'user id')

  return Promise.all([User.findById(userId), Post.findById(postId)])
  .then(([user, post]) => {
      if(!user) throw new ExistenceError('User not found.')
      
      if(!post) throw new ExistenceError('Post not found.')

      return Post.updateOne(
        { _id: postId },
        { $set: { onSale: null }}
      )
    })
}