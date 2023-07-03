const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  const { users, posts } = context

  return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
  .then(([user, post]) => {
      if(!user) throw new ExistenceError('User not found.')

      if(!post) throw new ExistenceError('Post not found.')

      let favsFromUser = user.favs.map(fav => fav.toString())

      if(favsFromUser.includes(postId))
        return users.updateOne(
          { _id: new ObjectId(userId) },
          { $pull: { favs: new ObjectId(postId) }}
        )
      else
      return users.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { favs: new ObjectId(postId) }}
      )
    })
}