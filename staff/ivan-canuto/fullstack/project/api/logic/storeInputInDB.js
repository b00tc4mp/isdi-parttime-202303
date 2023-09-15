const { validators: { validateId, validateUserInputObject }, errors: { ExistenceError } } = require('com')
const { User, Conversation } = require('../data/models')

/**
 * Stores the user input object in database
 * 
 * @param {string} userId The user id 
 * @param {string} conversationId The conversation id 
 * @param {object} userInput The user input in an object with the role
 * 
 * @returns {Promise} A Promise that resolves when a user input is stored in database successfully, or rejects with an error message if the operation fails
 * 
 * @throws {TypeError} On non-string user id or conversation id, or non-object user input
 * @throws {ContentError} On user id or conversation id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or conversation
 */

module.exports = function storeInputInDB(userId, conversationId, userInput) {
    validateId(userId, 'user id')
    validateId(conversationId, 'conversation id')
    validateUserInputObject(userInput, 'user input')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        const conversation = await Conversation.findById(conversationId)
        if(!conversation) throw new ExistenceError('Conversation not found.')

        conversation.messages.push(userInput)
        
        await conversation.save()
    })()
}