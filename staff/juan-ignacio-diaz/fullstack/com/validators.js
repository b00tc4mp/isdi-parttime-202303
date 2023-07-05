const { ContentError } = require('./errors')

const REGEXEMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ 

const REGEXPASSWORD =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

const correctPassword ="Correct password: \n"
    +"-The password string will start this way \n"
    +"-The string must contain at least 1 lowercase alphabetical character \n"
    +"-The string must contain at least 1 uppercase alphabetical character \n"
    +"-The string must contain at least 1 numeric character \n"
    +"-The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict \n"
    +"-The string must be eight characters or longer \n"

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!id.trim().length) throw new ContentError(`${explain} is empty`)
}

/**
 * Validates an email
 * 
 * @param {string} email An email
 */
function validateEmail(email, explain = 'email') {
    if (typeof email !== 'string') throw new TypeError(`${explain} is not a string`, {cause: "email"})
    if (!email.trim().length) throw new ContentError('email is empty', {cause: "email"})
    if (!REGEXEMAIL.test(email)) throw new ContentError('the email is wrong', {cause: "email"})
}

/**
 * Validates a password
 * 
 * @param {string} password The password
 * @param {string} explain An alternative description in case of error
 */
function validatePassword(password, explain = 'password') {
    if (typeof password !== 'string') throw new TypeError(`${explain} is not a string`, {cause: explain})
    if (password.trim().length < 8) throw new RangeError(`${explain} length lower than 8 characters`, {cause: explain})
    //if (!REGEXPASSWORD.test(password)) throw new TypeError(`${explain} the password is wrong`, {cause: explain})
}

function validateName(name) {
    if (typeof name !== 'string') throw new TypeError('name is not a string', {cause: "name"})
    if (!name.trim().length) throw new ContentError('name is empty', {cause: "name"})
}

function validateUrl(url, explain = 'url') {
    if (typeof url !== 'string') throw new TypeError(`${explain} is not a string`, {cause: explain})
    if (!url.trim().length) throw new TypeError(`${explain} is empty`, {cause: explain})
}

function validateText(text, explain = 'text') {
    if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!text.trim().length) throw new TypeError(`${explain} is empty`)
}

function validateNumber(number, explain = 'number') {
    if (typeof number !== 'number') throw new TypeError(`${explain} is not a number`)
}

function validateCallback(callback) {
    if (typeof callback !== 'function') throw new TypeError('Is not a Callback')
}

function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
    if (token.split('.').length !== 3) throw new ContentError(`${explain} is not valid`)
}

module.exports = {
    validateId,
    validateEmail,
    validateName,
    validatePassword,
    validateText,
    validateUrl,
    validateNumber,
    validateCallback,
    validateToken
}