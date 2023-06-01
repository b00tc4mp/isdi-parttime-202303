const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ 

const regexPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

const correctPassword ="Correct password: \n"
    +"-The password string will start this way \n"
    +"-The string must contain at least 1 lowercase alphabetical character \n"
    +"-The string must contain at least 1 uppercase alphabetical character \n"
    +"-The string must contain at least 1 numeric character \n"
    +"-The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict \n"
    +"-The string must be eight characters or longer \n"

module.exports = function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new Error(`${explain} is not a string`)
    if (!id.trim().length) throw new Error(`${explain} is empty`)
}

module.exports = function validateEmail(email, explain = 'email') {
    if (typeof email !== 'string') throw new Error(`${explain} is not a string`, {cause: "email"})
    if (!email.trim().length) throw new Error('email is empty', {cause: "email"})
    if (!regexEmail.test(email)) throw new Error('the email is wrong', {cause: "email"})
}

module.exports = function validatePassword(password, explain = 'password') {
    if (typeof password !== 'string') throw new Error(`${explain} is not a string`, {cause: explain})
    if (password.trim().length < 8) throw new Error(`${explain} length lower than 8 characters`, {cause: explain})
    //if (!regexPassword.test(password)) throw new Error(`${explain} the password is wrong`, {cause: explain})
}

module.exports = function validateName(name) {
    if (typeof name !== 'string') throw new Error('name is not a string', {cause: "name"})
    if (!name.trim().length) throw new Error('name is empty', {cause: "name"})
}

module.exports = function validateUrl(url, explain = 'url') {
    if (typeof url !== 'string') throw new Error(`${explain} is not a string`, {cause: explain})
    if (!url.trim().length) throw new Error(`${explain} is empty`, {cause: explain})
}

module.exports = function validateText(text, explain = 'text') {
    if (typeof text !== 'string') throw new Error(`${explain} is not a string`)
    if (!text.trim().length) throw new Error(`${explain} is empty`)
}

module.exports = function validateNumber(number, explain = 'number') {
    if (typeof text !== 'number') throw new Error(`${explain} is not a number`)
    if (!text.trim().length) throw new Error(`${explain} is empty`)
}

module.exports = function validateCallback(callback) {
    if (typeof callback !== 'function') throw new Error('Is not a Callback')
}