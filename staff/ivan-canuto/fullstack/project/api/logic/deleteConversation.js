const {
    validators: { validateId },
    errors: { ExistenceError }
  } = require('com')
  
const { User, Conversation } = require('../data/models')

module.exports = (userId, conversationId) => {
    validateId(userId, 'user id')
    validateId(conversationId, 'conversation id')

    return(async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        const conversation = await Conversation.findById(conversationId)
        if(!conversation) throw new ExistenceError('Conversation not found.')

        await Conversation.deleteOne({ _id: conversationId })
    })()
}