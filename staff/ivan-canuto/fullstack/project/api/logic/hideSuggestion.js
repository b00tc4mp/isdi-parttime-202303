const { validators: { validateId }, errors: { ExistenceError } } = require('com')
const { User, Suggestion } = require('../data/models')

/**
 * Sets a suggestion as hidden
 * 
 * @param {string} userId The user id 
 * @param {string} suggestionId The suggestion id
 * 
 * @returns {Promise} A Promise that resolves when a suggestion is hidden successfully, or rejects with an error message if the operation fails
 * 
 * @throws {TypeError} On non-string user id or suggestion id
 * @throws {ContentError} On user id or suggestion id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or suggestion
 */

module.exports = function hideSuggestion(userId, suggestionId) {
    validateId(userId, 'user id')
    validateId(suggestionId, 'suggestion id')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        const suggestion = await Suggestion.findById(suggestionId)
        if(!suggestion) throw new ExistenceError('Suggestion not found.')

        await Suggestion.updateOne(
            { _id: suggestionId},
            { $set: { hidden: !suggestion.hidden}}    
        )
    })()
}