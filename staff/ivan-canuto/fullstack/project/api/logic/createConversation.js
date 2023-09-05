require('dotenv').config()

const { validators: { validateId, validateText }, errors: { ExistenceError } } = require('com')
const { User, Conversation } = require('../data/models')
const { Configuration, OpenAIApi } = require('openai')
const mongoose = require('mongoose')
const { mongoose: { Types: { ObjectId } } } = mongoose

/**
 * Creates a conversation and a conversation title
 * 
 * @param {string} userId The user id 
 * @param {string} userInput The user input
 * 
 * @returns {Promise<string>} The conversation id
 * 
 * @throws {TypeError} On non-string user id or user input
 * @throws {ContentError} On user id not equal to 24 characters of length or not hexadecimal or not hexadecimal, or empty user input
 * @throws {ExistenceError} On non-existing user
 */

module.exports = function createConversation(userId, userInput) {
    validateId(userId, 'user id')
    validateText(userInput, 'user input')

    return (async () => {
        const user = await User.findById(userId)

        if(!user) throw new ExistenceError('User not found.')

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        })

        const openai = new OpenAIApi(configuration)

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Generate a short title for a conversation consisting in this user input: '${userInput}', in the same language of it, and without quotation marks.`,
            max_tokens: 30,
            temperature: 0.2
        })

        const title = response.data.choices[0].text.trim()

        await Conversation.create({
            author: user._id,
            title
        })

        const conversation = await Conversation.findOne({ author: new ObjectId(userId)}).sort({ createdAt: -1 })

        return conversation.id
    })()
}