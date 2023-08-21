const { User } = require('../../data/models')
const {
    validators: { validateId, validateEmail },
    errors: { ExistenceError, DuplicityError }
} = require('com')
const jwt = require('jsonwebtoken')

/**
 * 
 * @param {string} uniqueString 
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
module.exports = (token, newEmail) => {
    debugger
    const tokenIndex = token.indexOf("=");
    const tokenSliced = token.slice(tokenIndex + 1)

    const emailIndex = newEmail.indexOf("=");
    const emailSliced = newEmail.slice(emailIndex + 1)

    const payload = jwt.verify(tokenSliced, process.env.JWT_SECRET)
    const { sub: uniqueString } = payload

    validateId(uniqueString)
    validateEmail(emailSliced)

    return User.findOne({ uniqueString: uniqueString })
        .then(user => {
            return user.updateOne({ email: emailSliced })
        })
        .catch(error => {
            throw error
        })
}