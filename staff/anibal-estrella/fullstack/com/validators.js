const { ContentError } = require('./errors')

/**
 * Validates an email
 * @param {string} email an email
 */

function validateEmail(email, explain = "email") {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (typeof email !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!email.trim().length) throw new ContentError(`${explain} is blank`)
    if (!emailRegex.test(email)) throw new ContentError(`${explain} is not an email`)

}

/**
 * validates a password
 * @param {string} password the password
 * @param {string} explain alternative edescription in case of error
 */
function validatePassword(password, explain = "password") {
    if (typeof password !== 'string') throw new TypeError(`${explain} must be a string`)
    if (password.trim().length < 8) throw new RangeError(`The ${explain} must be more than 8 characters long`)
}

/**
 * calidates a name
 * @param {string} name the name
 */
function validateName(name, explain = "name") {
    if (typeof name !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!name.trim().length) throw new ContentError(`${explain} is blank`)
}

/**
 * 
 * @param {string} url an URL
 * @param {string} explain alternative edescription in case of error
 */
function validateUrl(url, explain = 'URL') {
    if (typeof url !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!url.trim().length) throw new ContentError(`${explain} is empty`)
}

const HEX_DICTIONARY = '0123456789abcdef'

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is ${typeof id} and must be a string`)
    if (id.trim().length !== 24) throw new ContentError(`${explain} doesn't have 24 characters`)
    for (let i = 0; i < id.length; i++) {
        const char = id[i];

        if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`${explain} is not a hexadecimal`)

    }

}

function validateText(text, explain = 'text') {
    if (text.length < 1) throw new Error(`${explain} must be longer than one character'`)
    if (typeof text !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!text.trim().length) throw new ContentError(`${explain} is blank`)
}

function validateCallback(callback, explain = "callback") {
    if (typeof callback != 'function') throw new Error(`${explain} must be a function`)
}
function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is ${typeof id} and must be a string`)
    if (token.split('.').length != 3) throw new ContentError(`${explain} is not `)
}


module.exports = {
    validatePassword,
    validateEmail,
    validateName,
    validateUrl,
    validateId,
    validateText,
    validateCallback,
    validateToken
}