const {
  validators: { validateId, validateText },
  errors: { ExistenceError }
} = require('com')
// const { Schema: { Types: { ObjectId} } } = require('mongoose')
const { User, Post } = require('../data/models')

module.exports = (userId, postId, postPrice) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateText(postPrice, 'post price')

  return Promise.all([User.findById(userId), Post.findById(postId)])
    .then(([user, post]) => {
      if(!user) throw new ExistenceError('User not found.')
      
      if(!post) throw new ExistenceError('Post not found.')

      return posts.updateOne(
        { _id: postId },
        { $set: { onSale: postPrice }}
      )
    })
}