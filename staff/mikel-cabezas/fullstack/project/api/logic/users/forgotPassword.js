const { User } = require('../../data/models')
// const randomString = require('../helpers/randomString')
const sendNewPasswordEmail = require('../helpers/sendNewPasswordEmail')
const retrieveUser = require('./retrieveUser')
const jwt = require('jsonwebtoken')

const {
    validators: { validateEmail },
    errors: { DuplicityError }
} = require('com')
/**
 * 
 * @param {string} name the user name 
 * @param {string} email the user email
 * @param {string} password the user password
 * @returns {void} does not return anything
 *
 * @throws {TypeError} on non-string name and email (sync)
 * @throws {ContentError} on empty name, email or password (sync)
 * @throws {FormatError} wrong format on email or password (sync)
 * 
 * @throws {DuplicityError} on already existing user with provided credentials (async)
 * 
 */

module.exports = function forgotPassword(email) {
    validateEmail(email)

    const randomString = () => {
        const length = 8
        let randomString = ''

        for (let i = 0; i < length; i++) {
            const character = Math.floor((Math.random() * 10) + 1)

            randomString += character
        }
        return randomString
    }
    const uniqueString = randomString()

    console.log(uniqueString)

    return User.findOne({ email })
        .then(user => {
            if (!user.uniqueString) {
                return user.updateOne({ uniqueString: uniqueString }).then(user => user)
            }

            return user
        })
        .then(user => {
            const payload = { sub: user.uniqueString }
            const { JWT_SECRET, JWT_RECOVER_EMAIL_EXPIRATION } = process.env
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_RECOVER_EMAIL_EXPIRATION })
            sendNewPasswordEmail(email, token)
        })
        .catch(error => {
            throw error
        })
}