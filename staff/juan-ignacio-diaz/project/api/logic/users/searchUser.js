const { 
    validators: { validateId, validateText },
    errors: { ExistenceError } 
} = require('com')

const { User } = require('../../data/models')

/**
 * find a user by email
 * 
 * @param {string} userId - The ID of the user looking.
 * @param {string} email - The email of the user I'm looking for
 * 
 * @returns {Promise<User: id, name avatar >} Of the searched user
 * 
 * @throws {ExistenceError} On existing email
 */
module.exports = (userId, email) => {
    validateId(userId, 'user id')
    validateText(email, 'email')

    return (async () => {
        const [user, userEmail] = await Promise.all([User.findById(userId), User.findOne({'email': { $regex: '^' + email, $options: 'i' }}, 'name avatar email').lean()])
        
        if (!user) throw new ExistenceError('user not found')

        if (!userEmail) throw new ExistenceError('email not found')

        userEmail.id = userEmail._id.toString()
        delete userEmail._id

        return userEmail
    })()
}