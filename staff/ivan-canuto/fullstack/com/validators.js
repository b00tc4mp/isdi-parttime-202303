const { ContentError } = require("./errors")
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

function validateName(name) {
  if (typeof name !== 'string') throw new TypeError('Name is not a string.')
  if (!name.trim().length) throw new ContentError('Name field is empty.')
}

function validateEmail(email, explanation = 'email') {
  if (typeof email!=='string') throw new TypeError(`The ${explanation} is not a string.`)
  if (!email.trim().length) throw new ContentError(`The ${explanation} field is empty.`, {cause: 'hola'})
  if(!EMAIL_REGEX.test(email)) throw new ContentError('The email is not valid.')
}

function validatePassword(password, explanation = 'password') {
  if (typeof password!=='string') throw new TypeError(`The ${explanation} is not a string.`)
  if (password.trim().length < 6) throw new RangeError(`The ${explanation} is lower than 6 characters.`)
}

function validateUrl(newUrl, explanation = 'url') {
  if (typeof newUrl !=='string') throw new TypeError(`The ${explanation} is not a string.`)
  if (!newUrl.trim().length) throw new ContentError(`The ${explanation} field is empty.`)

  const correctUrl = /(jpe?g|png|webp)/
  if (!correctUrl.test(newUrl)) throw new ContentError(`The url entered does not includes a .jpg/.jpg/.webp/.png extension.`)
}

const HEX_DICTIONARY = '0123456789abcdef'

function validateId(id, explanation = 'id') {
  if (typeof id !=='string') throw new TypeError(`The ${explanation} is not a string.`)
  if (id.trim().length !== 24) throw new ContentError(`The ${explanation} does not have 24 characters.`)
  
  for(let i = 0; i < id.length; i++) {
    const char = id[i]
    
    if(!HEX_DICTIONARY.includes(char)) throw new ContentErrorError(`The ${explanation} is not hexadecimal.`)
  }
}

function validateText(text, explanation = 'text') {
  if (typeof text !=='string') throw new TypeError(`The ${explanation} is not a string.`)
  if (!text.trim().length) throw new ContentError(`The ${explanation} field is empty.`)
}

function validateCallback(callBack, explanation = 'CallBack') {
  if (typeof callBack !== 'function') throw new ContentError(`${explanation} is not a function.`)
}

function validateToken(token, explanation = 'token') {
  if (typeof token !=='string') throw new TypeError(`The ${explanation} is not a string.`)
  if(token.split('.').length !== 3) throw new ContentError (`${explanation} is not valid.`)
}

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateUrl,
  validateText,
  validateCallback,
  validateId,
  validateToken
}