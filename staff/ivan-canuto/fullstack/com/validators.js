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

function validateId(id, explanation = 'id') {
  // console.log(id)
  if (typeof id !=='string') throw new TypeError(`The ${explanation} is not a string.`)
  if (!id.trim().length) throw new ContentError(`The ${explanation} field is empty.`)
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