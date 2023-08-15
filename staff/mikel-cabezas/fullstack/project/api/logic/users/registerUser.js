const { User } = require('../../data/models')
// const randomString = require('../helpers/randomString')
const sendEmail = require('../helpers/sendEmail')

const {
    validators: { validateName, validateEmail, validatePassword },
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

module.exports = function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)


    const randomString = () => {
        const length = 8
        let randomString = ''

        for (let i = 0; i < length; i++) {
            const character = Math.floor((Math.random() * 10) + 1)

            randomString += character
        }
        return randomString
    }
    const isValid = false
    const uniqueString = randomString()


    console.log(uniqueString)

    return User.create({ name, email, password, isValid, uniqueString })
        .then(() => sendEmail(email, uniqueString))
        .catch(error => {
            if (error.message.includes('E11000')) throw new DuplicityError(`This user whith email ${email} already exists`)
            throw error
        })
}