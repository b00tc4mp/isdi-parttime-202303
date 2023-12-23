const { 
    validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError, UnKnowError }
} = require('com')

const { User } = require('../../data/models')

/**
 * Register a user by name, email and password
 * 
 * @param {string} name The user's name
 * @param {string} email The user's email
 * @param {string} password The user's password
 * 
 * @throws {DuplicityError} On existing email
 * @throws {UnKnowError} On unknown error
 */
module.exports = (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try {
            await User.create({ name, 
                email, 
                password, 
                avatar: null,
                mode: '',
                contacts: []
            })
        }
        catch (error) {
            if(error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw new UnKnowError(error.message) 
        }
    })()


}