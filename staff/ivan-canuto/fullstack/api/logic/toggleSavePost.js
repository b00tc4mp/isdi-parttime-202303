const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')
const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    let favsFromUser = user.favs.map(fav => fav.toString())

    if(favsFromUser.includes(postId))
      await User.updateOne(
        { _id: userId },
        { $pull: { favs: new ObjectId(postId) }}
      )
    else
      await User.updateOne(
        { _id: userId },
        { $push: { favs: new ObjectId(postId) }}
      )
  })()
}