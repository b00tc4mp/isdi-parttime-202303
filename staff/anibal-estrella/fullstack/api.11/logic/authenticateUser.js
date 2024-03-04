const context = require('./context')
const {
    validators: { validateEmail, validatePassword },
    errors: { AuthError, ExistenceError }
} = require('com')

/**
 * Api/AuthenticateUser:
 * Authenticate a user against its credentials
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise<string>} The user ID
 * Errors:
 * @throws {TypeError} on non-string email or password
 * @throws {ContentError} on empty email
 * @throws { RangeError} on password length lower than 8 characters
 * @throws { ExistenceError} on non-existing user
 * @throws {AuthError} on wrong credentials
 */

module.exports = (email, password,) => {
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.findOne({ email })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            if (user.password !== password) throw new AuthError('wrong credentials')

            //only return the hash of the _id
            // "_id": {
            // "$oid": "6494082b7b80b0e1d774bb87"
            //   },
            return user._id.toString()
        })
}