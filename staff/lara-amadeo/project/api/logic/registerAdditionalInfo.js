const { validators: { validateText }, errors: { DuplicityError, ExistanceError } } = require('../../com')
const { User } = require('../data/models')

module.exports = function registerAdditionalInfo(userId, description, tags, location, availability) {

    validateText(description)
    validateText(location)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            return User.updateOne({ _id: userId }, { description, tags, location, availability })
        })
}