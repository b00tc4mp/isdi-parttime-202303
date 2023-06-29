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

      let likesFromPost = post.likes.map(like => like.toString())

      if(likesFromPost.includes(userId))
        return posts.updateOne(
          { _id: new ObjectId(postId) },
          { $pull: { likes: new ObjectId(userId) }}
        )
      else
      return posts.updateOne(
          { _id: new ObjectId(postId) },
          { $push: { likes: new ObjectId(userId) }}
        )
    })
}