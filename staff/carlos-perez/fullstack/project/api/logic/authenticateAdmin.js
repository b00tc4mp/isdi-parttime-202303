const {
    validators: { validateEmail, validatePassword },
    errors: { ExistenceError, AuthError }
} = require('com')
const { Administrator } = require('../data/models')

module.exports = (email, password) => {
    validateEmail(email)
    validatePassword(password)
    return (async () => {
        const admin = await Administrator.findOne({ email })

        if (!admin) throw new ExistenceError('user not found')

        if (admin.password !== password) throw new AuthError('wrong credentials')

        return admin.id
    })()
}