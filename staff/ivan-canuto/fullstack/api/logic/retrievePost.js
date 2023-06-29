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

      post.id = post._id.toString()
      delete post._id

      post.author = {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      }

      return post
    })
}