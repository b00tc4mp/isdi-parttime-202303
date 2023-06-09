/**
 * Validates an email
 * @param {string} email an email
 */

function validateEmail(email, explain = "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string') throw new Error(`${explain} must be a string`)
    if (!email.trim().length) throw new Error(`${explain} is blank`)
    if (!emailRegex.test(email)) throw new Error(`${explain} is not an email`)

}

/**
 * validates a password
 * @param {string} password the password
 * @param {string} explain alternative edescription in case of error
 */
function validatePassword(password, explain = "password") {
    if (typeof password !== 'string') throw new Error(`${explain} must be a string`)
    if (password.trim().length < 8) throw new Error(`${explain} password must be more than 8 characters long`)
}

/**
 * calidates a name
 * @param {string} name the name
 */
function validateName(name, explain = "name") {
    if (typeof name !== 'string') throw new Error(`${explain} must be a string`)
    if (!name.trim().length) throw new Error(`${explain} is blank`)
}

/**
 * 
 * @param {string} url an URL
 * @param {string} explain alternative edescription in case of error
 */
function validateUrl(url, explain = 'URL') {
    if (typeof url !== 'string') throw new Error(`${explain} must be a string`)
    if (!url.trim().length) throw new Error(`${explain} is empty`)
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new Error(`${explain} is ${typeof id} and must be a string`)
    if (!id.trim().length) throw new Error(`${explain} is empty`)
}

function validateText(text, explain = 'text') {
    if (text.length < 1) throw new Error(`${explain} must be longer than one character'`)
    if (typeof text !== 'string') throw new Error(`${explain} must be a string`)
    if (!text.trim().length) throw new Error(`${explain} is blank`)
}

function validateCallback(callback, explain = "callback") {
    if (typeof callback != 'function') throw new Error(`${explain} must be a function`)
}

module.exports = {
    validateCallback,
    validateEmail,
    validateId,
    validateName,
    validatePassword,
    validateText,
    validateUrl
}