const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
  validateId(postId, 'post id')
  validateId(userId, 'user id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    await Post.updateOne(
      { _id: postId },
      { $set: { onSale: null }}
    )
  })()
}