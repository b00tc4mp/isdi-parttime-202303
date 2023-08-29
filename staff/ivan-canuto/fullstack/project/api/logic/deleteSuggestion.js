const {
    validators: { validateId },
    errors: { ExistenceError }
  } = require('com')
  
  const { User, Post, Suggestion } = require('../data/models')

/**
 * Deletes a suggestion
 * 
 * @param {string} userId The user id 
 * @param {string} postId The post id
 * @param {string} suggestionId The suggestion id
 * 
 * @returns {Promise} A Promise that resolves when a suggestion is deleted successfully, or rejects with an error message if deletion fails
 *
 * @throws {TypeError} On non-string user id, post id or suggestion id
 * @throws {ContentError} On user id, post id or suggestion id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user, post or suggestion
 */
  
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