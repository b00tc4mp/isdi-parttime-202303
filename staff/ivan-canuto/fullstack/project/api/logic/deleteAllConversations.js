const {
    validators: { validateId },
    errors: { ExistenceError }
  } = require('com')
  
const { User, Conversation } = require('../data/models')

module.exports = (userId) => {
    validateId(userId, 'user id')

    return(async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        await Conversation.deleteMany({ author: userId })
    })()
}