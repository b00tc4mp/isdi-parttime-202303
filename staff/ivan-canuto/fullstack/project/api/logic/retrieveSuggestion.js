const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Suggestion } = require("../data/models")

module.exports = (userId, suggestionId) => {
    validateId(userId, 'user id')
    validateId(suggestionId, 'suggestion id')

    return(async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        const suggestion = await Suggestion.findById(suggestionId).lean()
        if(!suggestion) throw new ExistenceError('Suggestion not found.')

        delete suggestion.post
        delete suggestion.author
        delete suggestion.postAuthor

        return suggestion
    })()
}