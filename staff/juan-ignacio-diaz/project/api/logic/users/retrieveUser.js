const { 
    validators: { validateId },
    errors: { ExistenceError } 
} = require('com')

const { User } = require('../../data/models')

/**
 * Retrieve a user by userId
 * 
 * @param {string} name The user's name
 * @param {string} email The user's email
 * @param {string} password The user's password
 * @param {string} mode The user's mode view
 * @param {string} contacts The user's contacts
 * 
 * @returns {Promise<User: name avatar mode contacts>} The user id
 * 
 * @throws {DuplicityError} On existing email
 */
module.exports = (userId) => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId, 'name avatar mode')
            .populate('contacts', 'name avatar email').lean()
        if (!user) throw new ExistenceError('user not found')

        delete user._id

        return user
    })()
}