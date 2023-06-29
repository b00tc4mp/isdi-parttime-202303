const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId, commentId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateId(commentId, 'comment id')

  const { users, posts } = context

  return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
    .then(([user, post]) => {
      if(!user) throw new Error('User not found.')
      if(!post) throw new Error('Post not found.')

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $pull: { comments: { id: commentId }}}
      )
    })
}