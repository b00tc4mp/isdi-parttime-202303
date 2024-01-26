const context = require('../context')
const { validators: { validateName, validateEmail, validatePassword } } = require('com')

module.exports = function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.insertOne({ name, email, password })

}