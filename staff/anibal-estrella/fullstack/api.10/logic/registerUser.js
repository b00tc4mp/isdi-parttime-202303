const { validators: { validateName, validateEmail, validatePassword },
    errors: { DuplicityError, ContentError } } = require('com')

const context = require('./context')

/**
 * Api/registerUser:
 * Ragister user against in db
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise}
 */
module.exports = (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)


    const { users } = context

    return users.insertOne({ name, email, password, avatar: null, favs: [] })
        // send error to handler to give it a status
        .catch(error => {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        })
}