const { 
    validators: { validateEmail, validatePassword },
    errors: { ExistenceError, AuthError}
} = require('com')

const context = require('../context')

module.exports = function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.findOne({ email })
        .then(user => {
            if (!user) throw new ExistenceError ('user not found')
            
            if (user.password !== password) throw new AuthError ('wrong credentials')

            return user._id.toString()
        })
}
