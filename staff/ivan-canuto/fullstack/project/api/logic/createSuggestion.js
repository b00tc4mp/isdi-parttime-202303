const { validators: { validateId, validateSuggestionTitle, validateSuggestionContent } } = require('com')
const { errors: { ExistenceError, ContentError } } = require('com')

const { User, Post, Suggestion } = require('../data/models')

/**
 * Creates a suggestion
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * @param {string} title The suggestion title
 * @param {string} content The suggestion content
 * 
 * @returns {Promise} A Promise that resolves when a suggestion is created successfully, or rejects with an error message if suggestion creation fails
 * 
 * @throws {TypeError} On non-string user id, post id, suggestion title or suggestion content
 * @throws {ContentError} On user id or post id not equal to 24 characters of length or not hexadecimal or not hexadecimal, or empty suggestion title or length longer tha 30 characters, or empty suggestion content or length not being between 50 and 500 characters
 * @throws {ExistenceError} On non-existing user or post
 */

module.exports = (userId, postId, title, content) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateSuggestionTitle(title)
  validateSuggestionContent(content)

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError(`User not found.`)

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError(`Post not found.`)

    await Suggestion.create({
      author: user._id,
      post: post._id,
      postAuthor: post.author,
      title,
      content
    })
  })()
}