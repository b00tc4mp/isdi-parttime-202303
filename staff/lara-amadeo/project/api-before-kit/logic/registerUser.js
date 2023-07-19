const { validators: { validateText, validateEmail, validatePassword }, errors: { DuplicityError } } = require('../../com')
const { User } = require('../data/models')

module.exports = function registerUser(username, name, email, password) {

    validateText(username)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try {
            await User.create({ username, name, email, password })
        } catch (error) {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        }
    })()
}