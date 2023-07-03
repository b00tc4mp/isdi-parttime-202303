const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId) => {
  validateId(postId, 'post id')
  validateId(userId, 'user id')

  const { users, posts } = context
  
  return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
  .then(([user, post]) => {
      if(!user) throw new ExistenceError('User not found.')
      
      if(!post) throw new ExistenceError('Post not found.')

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { onSale: null }}
      )
    })
}