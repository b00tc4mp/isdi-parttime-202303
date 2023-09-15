const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, postId, commentId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateId(commentId, 'comment id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    await Post.updateOne(
      { _id: postId },
      { $pull: { comments: { _id: commentId }}}
    )
  })()
}