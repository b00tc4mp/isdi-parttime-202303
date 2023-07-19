const { errors: { ExistanceError, AuthError } } = require('../../com')
const { validateEmail, validatePassword } = require('../../com/validators')
const { User } = require('../data/models')

module.exports = function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try {
            const user = await User.findOne({ email })
            if (!user) throw new ExistanceError(`User with email ${email} not found`)

            if (user.password !== password) throw new AuthError(`Email or password incorrect`)
            return user.id
        } catch (error) {
            throw error
            // throw new Error(error.stack) // perguntar a manu
        }
    })()
}