const {
    validators: { validateId },
    errors: { ExistenceError }
  } = require('com')
const { User, Post } = require('../data/models')
  
  module.exports = (userId) => {
    validateId(userId, 'user id')
  
    return (async () => {
      const user = await User.findById(userId).lean()
      if(!user) throw new ExistenceError('User not found.')

      const seenPosts = await Promise.all(
        user.seenLately.map(async postId => {
          const foundPost = await Post.findById(postId).populate('author', 'name avatar').lean()

          if(foundPost) {
            foundPost.id = foundPost._id.toString()
            delete foundPost._id

            foundPost.author.id = foundPost.author._id.toString()
            delete foundPost.author._id

            return foundPost
          }
        })
      )

      return seenPosts
    })()
  }