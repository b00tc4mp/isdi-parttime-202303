const { validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError, ContentError, UnknownError } } = require('com')

const { User } = require('../data/models.js')
/**
 * Api/registerUser:
 * Ragister user against in db
 * @param {string} name user's name
 * @param {string} email user's email
 * @param {string} password user's password
 * @returns {Promise}
 */
module.exports = (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    return User.create({ name, email, password, favs: [] })
        // send error to handler to give it a status
        .catch(error => {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw new UnknownError(error.message)
        })
}