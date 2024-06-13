//require('dotenv').config()
const context = require('./context')
const { validators: { validateEmail, validateName, validatePassword } } = require('com')
const { DuplicityError } = require('com/errors')
const { ObjectId } = require('mongodb')
// const { validators:ar el default avatar: punLogo
// falta el password confirm

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