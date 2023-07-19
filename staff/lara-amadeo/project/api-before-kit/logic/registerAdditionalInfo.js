const { validators: { validateText }, errors: { DuplicityError, ExistanceError } } = require('../../com')
const { User } = require('../data/models')

module.exports = function registerAdditionalInfo(userId, description, tags, location, availability) {

    validateText(description)
    validateText(location)

    return (async () => {
        let user
        try {
            user = await User.findById(userId)
            await User.updateOne({ _id: userId }, { description, tags, location, availability })
        } catch (error) {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)
        }
    })()
}
/*
return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            return User.updateOne({ _id: userId }, { description, tags, location, availability })
        })
*/