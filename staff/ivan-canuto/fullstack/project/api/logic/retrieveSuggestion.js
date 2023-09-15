const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Suggestion } = require("../data/models")

/**
 * Retrieves a suggestion by suggestion id
 * 
 * @param {string} userId The user id
 * @param {string} suggestionId The suggestion id
 * 
 * @returns {Promise<object>} The suggestion object
 * 
 * @throws {TypeError} On non-string user id or suggestion id
 * @throws {ContentError} On user id or suggestion id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or suggestion
 */

module.exports = (userId, suggestionId) => {
    validateId(userId, 'user id')
    validateId(suggestionId, 'suggestion id')

    return(async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        const suggestion = await Suggestion.findById(suggestionId).lean()
        if(!suggestion) throw new ExistenceError('Suggestion not found.')

        delete suggestion.author
        delete suggestion.postAuthor

        suggestion.id = suggestion._id.toString()
        delete suggestion._id

        return suggestion
    })()
}