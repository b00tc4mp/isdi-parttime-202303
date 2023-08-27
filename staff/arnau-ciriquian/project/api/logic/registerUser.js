const { User } = require('../data/models')
const {
    validators: { validateEmail, validateName, validateNewPassword },
    errors: { DuplicityError } } = require('com')
// const { validators:ar el default avatar: punLogo
// falta el password confirm

/**
 * Registers a new user
 * 
 * @param {string} name New user name
 * @param {string} email New user email
 * @param {string} password New User password
 *  
 * @returns
 * 
 * @throws {TypeError} On non-string name, email or password
 * @throws {ContentError} On empty name, email or password
 * @throws {DuplicityError} On existing user
 */
module.exports = (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validateNewPassword(password)

    const character = null

    return User.create({ name, email, password, character })
        .catch(error => {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        })
}