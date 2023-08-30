const { validators: { validateText }, errors: { DuplicityError, ExistanceError } } = require('../../com')
const { User } = require('../data/models')

module.exports = function registerAdditionalInfo(userId, avatar, description, tags, location, availability) {

    validateText(description)
    validateText(location)

    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        await User.updateOne({ _id: userId }, { avatar, description, tags, location, availability })
    })()
}
/*
return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            return User.updateOne({ _id: userId }, { description, tags, location, availability })
        })
*/