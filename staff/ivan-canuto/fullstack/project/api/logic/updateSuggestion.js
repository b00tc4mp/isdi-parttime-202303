const { validators: { validateText, validateId } } = require('com')
const { errors: { ExistenceError } } = require('com')

const { User, Suggestion } = require('../data/models')

module.exports = (userId, suggestionId, title, content) => {
    validateId(userId, 'user id')
    validateId(suggestionId, 'suggestion id')
    validateText(title, 'post title')
    validateText(content, 'post content')

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