const { 
    validators: { validateEmail, validatePassword },
    errors: { ExistenceError, AuthError }
 } = require('com')

 const { User } = require('../../data/models')

/**
 * Authenticates a user by email and password
 * 
 * @param {string} email The user's email
 * @param {string} password The user's password
 * 
 * @returns {Promise<string>} The user id
 * 
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 */
module.exports = (email, password) => {
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        const user = await User.findOne({ email })
        if (!user) throw new ExistenceError('user not found')
        if (user.password !== password) throw new AuthError('wrong credentials')

        return user.id
    })()
}