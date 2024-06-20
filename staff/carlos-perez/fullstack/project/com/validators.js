const { ContentError } = require('./errors')
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

/**
 * Validates an email
 * 
 * @param {string} email An email
 */
function validateEmail(email) {
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (!email.trim().length) throw new ContentError('email is empty')
    if (!EMAIL_REGEX.test(email)) throw new ContentError('email is no valid')
}

/**
 * Validates a password
 * 
 * @param {string} password The password
 * @param {string} explain An alternative description in case of error
 */
function validatePassword(password, explain = 'password') {
    if (typeof password !== 'string') throw new TypeError(`${explain} is not a string`)
    if (password.trim().length < 8) throw new RangeError(`${explain} length lower than 8 characters`)
}

function validateName(name) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (!name.trim().length) throw new ContentError('name is empty')
}

function validateUrl(url, explain = 'url') {
    if (typeof url !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!url.trim().length) throw new ContentError(`${explain} is empty`)
}

const HEX_DICTIONARY = '0123456789abcdef'

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`)
    if (id.trim().length !== 24) throw new ContentError(`${explain} does not have 24 characters`)

    for (let i = 0; i < id.length; i++) {
        const char = id[i]

        if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`${explain} is not hexadecimal`)
    }
}

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
    validateEmail,
    validateName,
    validatePassword,
    validateText,
    validateUrl,
    validateCallback,
    validateId,
    validateToken
}