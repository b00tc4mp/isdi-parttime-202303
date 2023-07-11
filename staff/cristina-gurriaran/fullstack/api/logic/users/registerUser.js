const { 
    validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError }
 } = require('com')

const { User } = require('../../data/models')

module.exports = (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    return User.create({ name, email, password, avatar: null, favs: [] })
        .catch(error => {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        }) 
}