const { validators: { validateId, validateSuggestionTitle, validateSuggestionContent } } = require('com')
const { errors: { ExistenceError, ContentError } } = require('com')

const { User, Suggestion } = require('../data/models')

/**
 * Updates the suggestion with new data
 * 
 * @param {string} userId The user id
 * @param {string} suggestionId The suggestion id
 * @param {string} title The suggestion title
 * @param {string} content The suggestion content
 * 
 * @returns {Promise} A Promise that resolves when a suggestion is created successfully, or rejects with an error message if suggestion creation fails
 * 
 * @throws {TypeError} On non-string user id, suggestion id, suggestion title or suggestion content
 * @throws {ContentError} On user id or suggestion id not equal to 24 characters of length or not hexadecimal, or empty suggestion title or length longer tha 30 characters, or empty suggestion content or length not being between 50 and 500 characters
 * @throws {ExistenceError} On non-existing user or suggestion
 */

module.exports = (userId, suggestionId, title, content) => {
    validateId(userId, 'user id')
    validateId(suggestionId, 'suggestion id')
    validateSuggestionTitle(title)
    validateSuggestionContent(content)

    return(async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        const suggestion = await Suggestion.findById(suggestionId)
        if(!suggestion) throw new ExistenceError('Suggestion not found.')

        await Suggestion.updateOne(
            { _id: suggestionId },
            { $set: { title: title, content: content }}
        )
    })()
}