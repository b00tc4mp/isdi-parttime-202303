const { ContentError } = require('./errors')
// const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

function validateName(name) {

    if (typeof name !== 'string') throw new TypeError('name is not a string');
    if (!name.trim().length) throw new ContentError('name is empty')
    if (name.trim().length < 3) throw new RangeError('name length lower than 3 characters')
    if (name.trim().length > 15) throw new RangeError('name length upper 15 characters')

    // TODO regex pattern 
}

function validateEmail(email) {
    const emailRegex = /^[\w-.]+@[\w-]+(\.[a-zA-Z]{2,4}){1,2}$/

    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (!email.trim().length) throw new ContentError('email is empty')
    if (!emailRegex.test(email)) throw new ContentError('invalid email')
    // if(!EMAIL_REGEX.test(email)) throw new ContentError('invalid email')
}

function validatePassword(password) {
    const hasDigit = /\d/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const specialChar = /[-_+/#&]/.test(password)

    if (!password.trim().length) throw new ContentError('password is empty')
    if (!hasDigit) throw new ContentError('password must have at least one digit')
    if (!hasUpper) throw new ContentError('Password must have at least one uppercase')
    if (!hasLower) throw new ContentError('password must have at least one lowercase')
    if (!specialChar) throw new ContentError('password must have at least one special character')
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (password.trim().length < 6) throw new RangeError('password length lower than 6 characters')
    if (password.trim().length > 15) throw new RangeError('password length upper 15 characters')
}
function validateUserNewPassword(userNewPassword) {
    const hasDigit = /\d/.test(userNewPassword)
    const hasUpper = /[A-Z]/.test(userNewPassword)
    const hasLower = /[a-z]/.test(userNewPassword)
    const specialChar = /[-_+/#&]/.test(userNewPassword)

    if (!hasDigit) throw new ContentError("Password don't have digit")
    if (!hasUpper) throw new ContentError("Password don't have uppercase")
    if (!hasLower) throw new ContentError("Password don't have lowercase")
    if (!specialChar) throw new ContentError('Password must have at least one special character')
    if (typeof userNewPassword !== 'string') throw new TypeError('New password is not a string');
    if (!userNewPassword.trim().length) throw new ContentError(' New password is empty')
    if (userNewPassword.trim().length < 6) throw new RangeError('New password length lower than 6 characters')
    if (userNewPassword.trim().length > 12) throw new RangeError('New password length upper 12 characters')
}

function validateUrl(newAvatar, explain = 'url') {
    if (typeof newAvatar !== 'string') throw new TypeError(`${explain} is not a string`);
    if (!newAvatar.trim().length) throw new ContentError(`${explain} is empty`)
}

function validateUserConfirmNewPassword(userConfirmNewPassword) {
    const hasDigit = /\d/.test(userConfirmNewPassword)
    const hasUpper = /[A-Z]/.test(userConfirmNewPassword)
    const hasLower = /[a-z]/.test(userConfirmNewPassword)
    const specialChar = /[-_+/#&]/.test(userConfirmNewPassword)

    if (!hasDigit) throw new ContentError("Password don't have a digit")
    if (!hasUpper) throw new ContentError("Password don't have a uppercase")
    if (!hasLower) throw new ContentError("Password don't have a lowercase")
    if (!specialChar) throw new ContentError('Password must have at least one special character')
    if (typeof userConfirmNewPassword !== 'string') throw new TypeError('New confirmed password is not a string');
    if (!userConfirmNewPassword.trim().length) throw new ContentError('New confirmed password is empty')
    if (userConfirmNewPassword.trim().length < 6) throw new RangeError('New confirmed password length lower than 6 characters')
    if (userConfirmNewPassword.trim().length > 12) throw new RangeError('New confirmed password length upper 12 characters')
}

const HEX_DICTIONARY = '0123456789abcdef'

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`)
    if (id.trim().length !== 24) throw new ContentError(`${explain} doesn't have 24 characters`)

    for (let i = 0; i < id.length; i++) {
        const char = id[i]

        if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`${explain} is not hexadecimal`)
    }

}
// function validateStreet(employeeStreet, employeePostalCode, employeeCity, employeeCountry) {

//     if (typeof name !== 'string') throw new TypeError('name is not a string');
//     if (!name.trim().length) throw new ContentError('name is empty')
//     if (name.trim().length < 3) throw new RangeError('name length lower than 3 characters')
//     if (name.trim().length > 15) throw new RangeError('name length upper 15 characters')

//     // TODO regex pattern 
// }

function validateText(text, explain = 'text') {
    if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!text.trim().length) throw new ContentError(`${explain} is empty`)
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new TypeError(`${explain} is not a function`)
}

function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
    if (token.split('.').length !== 3) throw new ContentError(`${explain} is not valid`)
}


module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    validateUserNewPassword,
    validateUrl,
    validateUserConfirmNewPassword,
    validateId,
    validateText,
    validateCallback,
    validateToken,
}