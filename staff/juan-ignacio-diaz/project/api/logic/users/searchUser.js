const { 
    validators: { validateId, validateEmail },
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
    validateEmail(email)

    return (async () => {
        const [user, usersEmail] = await Promise.all([User.findById(userId), User.find({ email: email}, 'name avatar').lean()])

        if (!user) throw new ExistenceError('user not found')

        if (!usersEmail) throw new ExistenceError('email not found')

        usersEmail.forEach(userEmail => {
            userEmail.id = userEmail._id.toString()
            delete userEmail._id
        })

        return usersEmail
    })()
}