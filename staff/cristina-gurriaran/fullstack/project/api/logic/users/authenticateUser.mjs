const {
    validators: { validateEmail, validatePassword },
    errors: { ExistenceError, AuthError }
} = require('com')

const { User } = require('../../data/models')

module.exports = (email, password) => {
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        const user = await User.findOne({ email })

        if (!user) throw new ExistenceError('user with email ${user.email} not found')

        if (user.password !== password) throw new AuthError(`wrong credentials`)

        return user.id

    })()
}
