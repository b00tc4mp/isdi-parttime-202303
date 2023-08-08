const {
    validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError }
} = require('com')
const { Administrator } = require('../data/models')
const bcrypt = require('bcryptjs')

module.exports = (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try {
            const hash = await bcrypt.hashSync(password, 10)

            await Administrator.create({name, email, password: hash})
        } catch (error) {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        }
    })()
}