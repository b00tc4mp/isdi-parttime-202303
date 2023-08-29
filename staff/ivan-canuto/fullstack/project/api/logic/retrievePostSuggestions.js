const {
  validators: { validateId },
  errors: { ExistenceError }
} = require("com")
const { User, Post, Suggestion } = require("../data/models")

/**
 * Retrieves the suggestions that belong to the post
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * 
 * @returns {Promise<array>} The array of suggestions
 * 
 * @throws {TypeError} On non-string user id or post id
 * @throws {ContentError} On user id or post id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or post
 */

module.exports = (userId, postId) => {
  validateId(userId, "user id")
  validateId(postId, 'post id')

  return (async () => {
    const user = await User.findById(userId)
    if (!user) throw new ExistenceError("User not found.")

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    const suggestions = await Suggestion.find({ post: postId }).populate('author', 'name avatar').lean()

    suggestions.forEach(suggestion => {
      delete suggestion.post

      suggestion.id = suggestion._id.toString()
      delete suggestion._id

      suggestion.author.id = suggestion.author._id.toString()
    })
    
    suggestions.forEach(suggestion => {
      delete suggestion.author._id
    })

    return suggestions
  })()
}