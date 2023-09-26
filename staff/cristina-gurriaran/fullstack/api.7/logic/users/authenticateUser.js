const { 
    validators: { validateEmail, validatePassword },
    errors: { ExistenceError, AuthError}
} = require('com')

const { User } = require('../../data/models')

module.exports = (email, password) => {
    validateEmail(email)
    validatePassword(password)

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new ExistenceError ('user not found')
            
            if (user.password !== password) throw new AuthError ('wrong credentials')

            return user.id
        })
}
