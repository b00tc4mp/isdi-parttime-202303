const { validators: { validateId } } = require('com')
const { User, Post } = require('../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

module.exports = function savePostAsSeen(userId, postId) {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    const foundPostIndex = user.seenLately.findIndex(post => post.toString() === postId)

    if(foundPostIndex !== -1) {
      user.seenLately.splice(foundPostIndex, 1)

      user.seenLately.unshift(new ObjectId(postId))
    }
    else {
      if(user.seenLately.length === 15) user.seenLately.pop()
      
      user.seenLately.unshift(new ObjectId(postId))
    }

    await user.save()
  })()
}
