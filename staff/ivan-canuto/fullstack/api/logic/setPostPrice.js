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

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    await Post.updateOne(
      { _id: postId },
      { $set: { onSale: postPrice }}
    )
  })()
}