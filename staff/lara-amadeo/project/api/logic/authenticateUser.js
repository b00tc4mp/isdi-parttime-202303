const { errors: { ExistanceError, AuthError } } = require('../../com')
const { User } = require('../data/models')

module.exports = function authenticateUser(email, password) {
    return User.findOne({ email })
        .then(user => {
            if (!user) throw new ExistanceError(`User with email ${email} not found`)

            if (user.password !== password) throw new AuthError(`Email or password incorrect`)

            return user.id
        })
}