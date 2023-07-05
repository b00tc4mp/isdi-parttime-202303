const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { Schema: { Types: { ObjectId } } } = require('mongoose')
const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  return Promise.all([User.findById(userId), Post.findById(postId)])
  .then(([user, post]) => {
      if(!user) throw new ExistenceError('User not found.')

      if(!post) throw new ExistenceError('Post not found.')

      let favsFromUser = user.favs.map(fav => fav.toString())

      if(favsFromUser.includes(postId))
        return User.updateOne(
          { _id: userId },
          { $pull: { favs: new ObjectId(postId) }}
        )
      else
      return User.updateOne(
        { _id: userId },
        { $push: { favs: new ObjectId(postId) }}
      )
    })
}