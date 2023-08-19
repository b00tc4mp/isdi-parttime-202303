const {
    validators: { validateId },
    errors: { ExistenceError }
  } = require('com')
  const { mongoose: { Types: { ObjectId } } } = require('mongoose')
  
  const { User, Post, Suggestion } = require('../data/models')
  
  module.exports = (userId, postId, suggestionId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateId(suggestionId, 'suggestion id')
  
    return (async () => {
      const user = await User.findById(userId)
      if(!user) throw new ExistenceError('User not found.')
      
      const post = await Post.findById(postId)
      if(!post) throw new ExistenceError('Post not found.')
  
      const suggestion = await Suggestion.findById(suggestionId).lean()
      if(!suggestion) throw new ExistenceError('Suggestion not found.')

      await Suggestion.deleteOne({ _id: suggestionId })
    })()
  }