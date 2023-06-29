const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  const { users, posts } = context

  return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
  .then(([user, post]) => {
      if(!user) throw new Error('User not found.')

      if(!post) throw new Error('Post not found.')

      if(post.visible)
        return posts.updateOne(
          { _id: new ObjectId(postId) },
          { $set: { visible: false }}
        )
      else
        return posts.updateOne(
          { _id: new ObjectId(postId) },
          { $set: { visible: true }}
        )
    })
}