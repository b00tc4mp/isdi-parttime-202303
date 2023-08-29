const {
    validators: { validateId },
    errors: { ExistenceError }
  } = require("com")
const { User, Suggestion } = require("../data/models")

/**
 * Retrieves the suggestions made by the user
 * 
 * @param {string} userId The user id 
 * 
 * @returns {Promise<array>} The array of suggestions
 * 
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On user id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user
 */
  
  module.exports = (userId) => {
    validateId(userId, "user id")
  
    return (async () => {
      const user = await User.findById(userId)
      if (!user) throw new ExistenceError("User not found.")
  
      const suggestions = await Suggestion.find({ author: userId }).populate('postAuthor', 'name avatar').lean()

      suggestions.forEach(suggestion => {
        suggestion.id = suggestion._id.toString()
        delete suggestion._id

        suggestion.post = suggestion.post.toString()
        suggestion.author = suggestion.author.toString()
        
        if(suggestion.postAuthor._id) {
          suggestion.postAuthor.id = suggestion.postAuthor._id.toString()
          delete suggestion.postAuthor._id
        }
      })
  
      return suggestions
    })()
  }
  