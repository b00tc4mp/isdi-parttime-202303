const {
    validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError }
} = require('com')
const { User } = require('../data/models')
const bcrypt = require('bcryptjs')

module.exports = (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try {
            const hash = await bcrypt.hash(password, 10)

            await User.create({ name, email, password: hash, avatar: null, favs: [] })
        } catch (error) {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        }
    })()
}