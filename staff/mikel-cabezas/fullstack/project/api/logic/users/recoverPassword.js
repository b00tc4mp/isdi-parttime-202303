const { User } = require('../../data/models')
// const randomString = require('../helpers/randomString')

const {
    validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError }
} = require('com')
/**
 * 
 * @param {string} uniqueString the user string
 * @returns {void} does not return anything
 *
 * @throws {TypeError} on non-string name and email (sync)
 * @throws {ContentError} on empty name, email or password (sync)
 * @throws {FormatError} wrong format on email or password (sync)
 * 
 * @throws {DuplicityError} on already existing user with provided credentials (async)
 * 
 */

module.exports = function validateUser(uniqueString) {
    // TODO validate unique string
    return User.findOne({ uniqueString })
        .then(user => {
            return user.updateOne({ isValid: true })
        })
        .catch(error => {
            if (error.message.includes('E11000')) throw new DuplicityError(`This user whith email ${email} already exists`)
            throw error
        })
}