// import { Configuration, OpenAIApi } from 'openai'
const { Configuration, OpenAIApi } = require('openai')
const { User, Conversation } = require('../data/models')
const { validators: { validateId, validateArray }, errors: { ExistenceError } } = require('com')

/**
 * Authenticates a user against his/her credentials
 * 
 * @param {string} email The user email
 * @param {string} password The user password
 * 
 * @returns {Promise<string>} The user id
 * 
 * @throws {TypeError} On non-string email or password
 * @throws {ContentError} On empty email
 * @throws {RangeError} On password length lower than 8 characters
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 */

/**
 * Asks the API for a response to the user input
 * 
 * @param {string} userId The user id
 * @param {string} conversationId The conversation
 * @param {array} currentConversation The array of objects containing the conversation.
 * 
 * @returns {Promise<object>} The response object
 * 
 * @throws {TypeError} On non-string user id or conversation id, or non-array current conversation
 * @throws {ContentError} On user id or conversation id length not equal to 24 characters
 * @throws {ExistenceError} On non-existing user or conversation
 */

module.exports = function askForResponse(userId, conversationId, currentConversation) {
    validateId(userId, 'user id')
    validateId(conversationId, 'conversation id')
    validateArray(currentConversation, 'current conversation')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')
        
        const conversation = await Conversation.findById(conversationId)
        if(!conversation) throw new ExistenceError('Conversation not found.')

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        })

        const openai = new OpenAIApi(configuration)

        const newConversation = [...currentConversation]

        const instruction = {
            role: 'system',
            content: process.env.CONVERSATION_INSTRUCTION
        }

        newConversation.unshift(instruction)

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: newConversation,
            presence_penalty: 0,
            frequency_penalty: 0.3
        })

        const message = response.data.choices[0].message

        conversation.messages.push(message)

        await conversation.save()

        return message
    })()
}