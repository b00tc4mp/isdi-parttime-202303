const { User } = require('../../data/models')
const {
    validators: { validateId, validateEmail },
    errors: { ExistenceError, DuplicityError }
} = require('com')

/**
 * 
 * @param {string} userId 
 * @param {string} newEmail 
 * 
 * @returns {Promise<Object>} returns a promise object contains de user with the email updated 
 * 
 * @throws {TypeError} on non-string id and email (sync)
 * @throws {ContentError} on empty id or email (sync)
 * @throws {FormatError} wrong format on email (sync)
 * 
 * @throws {AuthError} on failed correlation on db and provided data in order to authorize this action (async)
 * @throws {DuplicityError} on already existing user with provided credentials (async)

 */
module.exports = (userId, newEmail) => {
    validateId(userId)
    validateEmail(newEmail)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')
            return user.updateOne({ email: newEmail })
        })
        .catch(error => {
            if (error.message.includes('E11000')) throw new DuplicityError(`This user whith email ${email} already exists`)
            throw error
        })
}