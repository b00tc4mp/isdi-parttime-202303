const { ContentError } = require('./errors')

function validateEmail(email) {
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (!email.length) throw new ContentError('email is empty')
    if (!email.match(/\S+@\S+\.\S+/)) throw new ContentError('email is not a valid adress')
}

function validateNewPassword(password, explain = 'password') {
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if(!password.length) throw new ContentError('password is empty')
    if (password.length < 4) throw new RangeError(`${explain} is shorter than 4 characters`)
    if (password.search(/[a-z]/) < 0) throw new ContentError(`${explain} does not include a lowercase`)
    if (password.search(/[A-Z]/) < 0) throw new ContentError(`${explain} does not include an uppercase`)
    if (password.search(/[0-9]/) < 0) throw new ContentError(`${explain} does not include a number`)
    if (password.search(/\s/) > 0) throw new ContentError(`${explain} includes a blank space`)
}

function validateName(name, explain = 'name') {
    if (typeof name !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!name.length) throw new ContentError(`${explain} is empty`)
}

function validatePasswordConfirm(password, passwordConfirm, explainOne = 'password confirmation', explainTwo ='password') {
    if (typeof passwordConfirm !== 'string') throw new TypeError(`${explainOne} is not a string`)
    if(!passwordConfirm.length) throw new ContentError(`${explainOne} is empty`)
    if (password !== passwordConfirm) throw new ContentError(`${explainOne} is different than ${explainTwo}`)
}

function validatePassword(password) {
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if(!password.length) throw new ContentError('password is empty')
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!id.trim().length) throw new ContentError(`${explain} is empty`)
}

function validateUrl(url, explain = 'url') {
    if (typeof url !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!url.trim().length) throw new ContentError(`${explain} is empty`)
}

function validateText(text, explain = 'text') {
    if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!text.trim().length) throw new ContentError(`${text} is empty`)
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new TypeError(`${explain} is not a function`)
}

function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
    if (token.split('.').length !== 3) throw new ContentError(`${explain} is not valid`)
}

function validateBoolean(boolean, explain = 'boolean') {
    if (typeof boolean !== 'boolean') throw new TypeError(`${explain} is not a boolean`)
    if (!text.trim().length) throw new ContentError(`${text} is empty`)
}

module.exports = { 
    validateEmail,
    validatePassword,
    validateName,
    validateNewPassword,
    validateCallback,
    validateText,
    validateId,
    validateUrl,
    validatePasswordConfirm,
    validateToken,
    validateBoolean
}