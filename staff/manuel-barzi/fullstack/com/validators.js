/**
 * Validates an email
 * 
 * @param {string} email An email
 */
function validateEmail(email) {
    if (typeof email !== 'string') throw new Error('email is not an string')
    if (!email.trim().length) throw new Error('email is empty')
    // TODO validate email format with regex pattern
}

/**
 * Validates a password
 * 
 * @param {string} password The password
 * @param {string} explain An alternative description in case of error
 */
function validatePassword(password, explain = 'password') {
    if (typeof password !== 'string') throw new Error(`${explain} is not a string`)
    if (password.trim().length < 8) throw new Error(`${explain} length lower than 8 characters`)
}

function validateName(name) {
    if (typeof name !== 'string') throw new Error('name is not a string')
    if (!name.trim().length) throw new Error('name is empty')
}

function validateUrl(url, explain = 'url') {
    if (typeof url !== 'string') throw new Error(`${explain} is not a string`)
    if (!url.trim().length) throw new Error(`${explain} is empty`)
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new Error(`${explain} is not a string`)
    if (!id.trim().length) throw new Error(`${explain} is empty`)
}

function validateText(text, explain = 'text') {
    if (typeof text !== 'string') throw new Error(`${explain} is not a string`)
    if (!text.trim().length) throw new Error(`${explain} is empty`)
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new Error(`${explain} is not a function`)
}

module.exports = {
    validateEmail,
    validateName,
    validatePassword,
    validateText,
    validateUrl,
    validateCallback,
    validateId
}