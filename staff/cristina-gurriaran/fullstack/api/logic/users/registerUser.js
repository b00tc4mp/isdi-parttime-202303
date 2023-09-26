const { 
    validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError }
 } = require('../../../com')

const { User } = require('../../data/models')

module.exports = (name, email, password) => {
    debugger
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try{
            const promise = await User.create({ name, email, password, avatar: null, favs: [] })
        } catch (error) {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        }
    })()
}