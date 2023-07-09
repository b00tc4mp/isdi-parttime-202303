const context = require('../context')
const {
    validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError }
} = require('com')

/**
 * 
 * @param {string} name the user name 
 * @param {string} email the user email
 * @param {string} password the user password
 * @returns {void} does not return anything
 *
 * @throws {TypeError} on non-string name and email (sync)
 * @throws {ContentError} on empty name, email or password (sync)
 * @throws {FormatError} wrong format on email or password (sync)
 * 
 * @throws {DuplicityError} on already existing user with provided credentials (async)
 * 
 */

module.exports = function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.insertOne({ name, email, password })
        .catch(error => {
            if (error.message.includes('E11000')) throw new DuplicityError(`This user whith email ${email} already exists`)
            throw error
        })
}