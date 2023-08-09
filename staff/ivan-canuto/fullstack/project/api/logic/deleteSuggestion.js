const {
    validators: { validateId },
    errors: { ExistenceError }
  } = require('com')
  const { mongoose: { Types: { ObjectId } } } = require('mongoose')
  
  const { User, Suggestion } = require('../data/models')
  
  module.exports = (userId, suggestionId) => {
    validateId(userId, 'user id')
    validateId(suggestionId, 'suggestion id')
  
    return (async () => {
      const users = await User.find()
  
      const user = users.find(user => user.id === userId)
      if(!user) throw new ExistenceError('User not found.')
  
      const suggestion = await Suggestion.findById(suggestionId)
      if(!suggestion) throw new ExistenceError('Suggestion not found.')
  
      await Suggestion.deleteOne({ _id: suggestionId })
    })()
  }