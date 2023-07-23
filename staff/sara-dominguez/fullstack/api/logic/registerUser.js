const {
    validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError, UnknownError }
} = require('com')

const { User } = require('../data/models')

module.exports = function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)


    // return User.create({ name, email, password, avatar: null, favs: [] })
    //     .then(() => { })
    //     .catch(error => {
    //         if (error.message.includes('E11000'))
    //             throw new DuplicityError(`user with email ${email} already exists`)
    //         throw error
    //     })


    return (async () => {
        try {
            await User.create({ name, email, password, avatar: null, favs: [] })

            // seria un return undefined, no ponemos nada
        } catch (error) {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw new UnknownError(error.message)
        }
    })()
} 