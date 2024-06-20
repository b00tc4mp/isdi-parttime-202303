const { errors: { ExistanceError, AuthError } } = require('com')
const context = require('./context')

module.exports = function authenticateUser(email, password) {

    const { users } = context
    return users.findOne({ email })
        .then(user => {
            if (!user) throw new ExistanceError(`User with email ${email} not found`)

            if (user.password !== password) throw new AuthError(`Email or password incorrect`)

            return user._id.toString()
        })
}

