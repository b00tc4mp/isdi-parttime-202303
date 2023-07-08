const { validators: { validateText, validateEmail, validatePassword }, errors: { DuplicityError } } = require('com')
const { User } = require('../data/models')

module.exports = function registerUser(username, email, password) {

    validateText(username)
    validateEmail(email)
    validatePassword(password)

    return User.create({
        username,
        email,
        password,
        avatar: null,
        likedPosts: [],
        savedPosts: []
    })
        .catch(error => {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        })
}