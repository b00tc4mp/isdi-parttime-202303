require('dotenv').config()
const { validators: { validateText, validateId } } = require('com')
const { errors: { ExistenceError } } = require('com')

const { User, Post, Conversation } = require('../data/models')

module.exports = (userId, conversationId, summary) => {
  validateId(userId, 'user id')
  validateId(conversationId, 'conversation id')
  validateText(summary, 'summary text')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError(`User with id ${userId} not found.`)
    
    const conversation = await Conversation.findById(conversationId).lean()
    if(!conversation) throw new ExistenceError(`Conversation not found.`)

    console.log(user, user._id, 'esto lo hago para mirar si los ids los devuelve como objectId o como string')

    await Post.create({
      author: user._id,
      title: conversation.title,
      text: summary
    })
  })()
}