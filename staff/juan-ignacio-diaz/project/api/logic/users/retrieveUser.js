const { 
    validators: { validateId },
    errors: { ExistenceError } 
} = require('com')

const { User } = require('../../data/models')

/**
 * Retrieve a user by userId
 * 
 * @param {string} userId - The ID of the user to retrieve.
 * 
 * @returns {Promise<User: name avatar mode contacts>} The user id
 * 
 * @throws {ExistenceError} On existing email
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