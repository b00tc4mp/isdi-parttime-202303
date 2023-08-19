const {
    validators: { validateId },
    errors: { ExistenceError }
  } = require("com")
const { User, Post, Suggestion } = require("../data/models")
// const { mongoose: { Types: { ObjectId } } } = require('mongoose')
  
  module.exports = (userId) => {
    validateId(userId, "user id")
  
    return (async () => {
      const user = await User.findById(userId)
      if (!user) throw new ExistenceError("User not found.")
  
      const suggestions = await Suggestion.find({ author: userId }).populate('postAuthor', 'name avatar').lean()

      suggestions.forEach(suggestion => {
        suggestion.id = suggestion._id
        delete suggestion._id
      })
  
      return suggestions
    })()
  }
  