const {
    validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError, UnknownError }
} = require('com')
const { User } = require('../../data/models')

module.exports = function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try{
            await User.create({ name, email, password, avatar: null, favs: [] })

        } catch (error) {
            if (error.message.includes('E11000')) {
                throw new DuplicityError(`user already exists`)

            } else {
                throw new UnknownError('unknown')
            }
        }
    })()
}