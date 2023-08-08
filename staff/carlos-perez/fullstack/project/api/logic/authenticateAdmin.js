const {
    validators: { validateEmail, validatePassword },
    errors: { ExistenceError, AuthError }
} = require('com')
const { Administrator } = require('../data/models')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    validateEmail(email)
    validatePassword(password)
    return (async () => {
        const admin = await Administrator.findOne({ email })

        if (!admin) throw new ExistenceError('user not found')

        const match = await bcrypt.compare(password, admin.password)

        if (!match) throw new AuthError('wrong credentials')

        return admin.id
    })()
}