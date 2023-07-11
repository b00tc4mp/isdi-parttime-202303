const {
    validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError }
} = require('com')
const context = require('./context')

module.exports = (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.insertOne({ name, email, password, avatar: null, favs: [] })
        .catch(error => {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        })
}