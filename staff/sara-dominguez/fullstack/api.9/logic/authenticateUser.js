const context = require('./context')
const { validators: { validateEmail, validatePassword } } = require('com')

module.exports = function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.findOne({ email })
        .then(user => {
            if (!user) throw new Error('user not found')

            if (user.password !== password) throw new Error('error credentials')

            return user._id.toString()
        })



}