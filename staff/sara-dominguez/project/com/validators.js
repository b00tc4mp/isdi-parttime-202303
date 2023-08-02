const { ContentError } = require('./errors')
// const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

function validateName(name) {

    if (typeof name !== 'string') throw new TypeError('name is not a string');
    if (!name.trim().length) throw new ContentError('name is empty')
    if (name.trim().length < 3) throw new RangeError('name length lower than 3 characters')
    if (name.trim().length > 15) throw new RangeError('name length upper 15 characters')

    // TODO regex pattern 
}
function validateEmployeeNumber(employeeNumber) {

    if (typeof employeeNumber !== 'string') throw new TypeError('employeeNumber is not a string');
    if (!employeeNumber.trim().length) throw new ContentError('employeeNumber is empty')
    if (employeeNumber.trim().length !== 5) throw new ContentError('employeeNumber does not have 5 characters')

    // TODO regex pattern 
}

function validateEmail(email) {
    const emailRegex = /^[\w-.]+@[\w-]+(\.[a-zA-Z]{2,4}){1,2}$/

    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (!email.trim().length) throw new ContentError('email is empty')
    if (!emailRegex.test(email)) throw new ContentError('invalid email')
    // if(!EMAIL_REGEX.test(email)) throw new ContentError('invalid email')
}

function validateEmployeePassword(employeeNewPassword) {
    const hasDigit = /\d/.test(employeeNewPassword)
    const hasUpper = /[A-Z]/.test(employeeNewPassword)
    const hasLower = /[a-z]/.test(employeeNewPassword)
    const specialChar = /[-_+/#&]/.test(employeeNewPassword)

    if (!hasDigit) throw new ContentError("Password don't have digit")
    if (!hasUpper) throw new ContentError("Password don't have uppercase")
    if (!hasLower) throw new ContentError("Password don't have lowercase")
    if (!specialChar) throw new ContentError('Password must have at least one special character')
    if (typeof employeeNewPassword !== 'string') throw new TypeError('New password is not a string');
    if (!employeeNewPassword.trim().length) throw new ContentError(' New password is empty')
    if (employeeNewPassword.trim().length < 6) throw new RangeError('New password length lower than 6 characters')
    if (employeeNewPassword.trim().length > 12) throw new RangeError('New password length upper 12 characters')
}

function validateUrl(newAvatar, explain = 'url') {
    if (typeof newAvatar !== 'string') throw new TypeError(`${explain} is not a string`);
    if (!newAvatar.trim().length) throw new ContentError(`${explain} is empty`)
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
function validateBankAccountNumber(bankAccountNumber, explain = 'bankAccountNumber') {
    if (typeof bankAccountNumber !== 'string') throw new TypeError(`${explain} is not a string`)
    if (bankAccountNumber.trim().length !== 24) throw new ContentError(`${explain} doesn't have 24 characters`)

    // for (let i = 0; i < id.length; i++) {
    //     const char = id[i]

    //     if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`${explain} is not hexadecimal`)
    // }

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
    validateEmployeePassword,
    validateEmployeeNumber,
    validateUrl,
    validateId,
    validateText,
    validateCallback,
    validateToken,
    validateBankAccountNumber
}