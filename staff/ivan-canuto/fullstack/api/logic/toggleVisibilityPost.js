const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  return Promise.all([User.findById({ _id: userId }), Post.findById({ _id: postId })])
  .then(([user, post]) => {
      if(!user) throw new ExistenceError('User not found.')

      if(!post) throw new ExistenceError('Post not found.')

      if(post.visible)
        return Post.updateOne(
          { _id: postId },
          { $set: { visible: false }}
        )
      else
        return Post.updateOne(
          { _id: postId },
          { $set: { visible: true }}
        )
    })
}