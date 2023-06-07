/**
 * Validates an email
 * @param {string} email an email
 */

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string') throw new Error('email must be a string')
    if (!email.trim().length) throw new Error('email is blank')
    if (!emailRegex.test(email)) throw new Error(`${email} is not an email`)

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
function validateName(name) {
    if (typeof name !== 'string') throw new Error('name must be a string')
    if (!name.trim().length) throw new Error('name is blank')
}

/**
 * 
 * @param {string} url an URL
 * @param {string} explain alternative edescription in case of error
 */
function validateUrl(url, explain = 'URL') {
    if (typeof url !== 'string') throw new Error('URL must be a string')
    if (!url.trim().length) throw new Error(`The URL field ${url} is empty`)
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new Error(`id is ${typeof id} and must be a string`)
    if (!id.trim().length) throw new Error(`${id} is empty`)
}

function validateText(text) {
    if (text.length < 1) throw new Error('text must be longer than one character')
    if (typeof text !== 'string') throw new Error('text must be a string')
    if (!text.trim().length) throw new Error('text is blank')
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