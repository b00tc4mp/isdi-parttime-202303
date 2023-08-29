require('dotenv').config()
const { validators: { validateText, validateId } } = require('com')
const { errors: { ExistenceError } } = require('com')

const { User, Post, Conversation } = require('../data/models')

/**
 * Creates a post
 * 
 * @param {string} userId The user id
 * @param {string} conversationId The conversation id
 * @param {string} summary The summary/text of the post
 * 
 * @returns {Promise} A Promise that resolves when a post is created successfully, or rejects with an error message if the post creation fails
 * 
 * @throws {TypeError} On non-string user id, conversation id or summary text
 * @throws {ContentError} On user id or conversation id not equal to 24 characters of length or not hexadecimal or not hexadecimal, or empty summary text
 * @throws {ExistenceError} On non-existing user or conversation
 */

module.exports = (userId, conversationId, summary) => {
  validateId(userId, 'user id')
  validateId(conversationId, 'conversation id')
  validateText(summary, 'summary text')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError(`User not found.`)
    
    const conversation = await Conversation.findById(conversationId).lean()
    if(!conversation) throw new ExistenceError(`Conversation not found.`)

    await Post.create({
      author: user._id,
      title: conversation.title,
      text: summary
    })
  })()
}