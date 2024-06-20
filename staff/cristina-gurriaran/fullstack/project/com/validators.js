const { ContentError } = require('./errors')
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i


function validateEmail(email){
    if(typeof email !== 'string') throw new TypeError ('email is not a string')
    if (!email.trim().length) throw new ContentError ('email is empty')
    if (!EMAIL_REGEX.test(email)) throw new ContentError('email is no valid')
}

function validatePassword(password, explain ='password'){
    if(typeof password !== 'string') throw new TypeError (`${explain} is not a string`)
    if(password.trim().length < 8) throw new RangeError (`${explain} has less than 8 characters`)

}

function validateName(name) {
    if(typeof name !== 'string') throw new TypeError ('name is not a string')
    if (!name.trim().length) throw new ContentError ('name is empty')
}

function validateUrl (url, explain = 'url'){
    if (typeof url !== 'string') throw TypeError ('url is not a string')
    if (!url.trim().length) throw new ContentError ('url is empty')
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!id.trim().length) throw new ContentError(`${explain} is empty`)
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

function validateObject(object, explain = 'object') {
    if (typeof object !== 'object') throw new TypeError(`${explain} is not an object`)

    if (Object.keys(object).length === 0) throw new ContentError(`${explain} is an empty object`);
}

module.exports = { 
    validateEmail, 
    validatePassword, 
    validateName, 
    validateUrl, 
    validateId, 
    validateText, 
    validateCallback,
    validateToken,
    validateObject
}