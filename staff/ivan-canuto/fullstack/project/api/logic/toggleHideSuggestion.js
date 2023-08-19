const { validators: { validateId }, errors: { ExistenceError } } = require('com')
const { User, Suggestion } = require('../data/models')

module.exports = function toggleCheckSuggestion(userId, suggestionId) {
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