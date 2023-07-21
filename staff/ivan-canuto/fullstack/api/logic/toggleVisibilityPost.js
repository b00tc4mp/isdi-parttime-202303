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

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    if(post.visible)
      await Post.updateOne(
        { _id: postId },
        { $set: { visible: false }}
      )
    else
      await Post.updateOne(
        { _id: postId },
        { $set: { visible: true }}
      )
  })()
}