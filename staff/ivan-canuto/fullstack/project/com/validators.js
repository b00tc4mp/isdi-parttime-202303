const { ContentError, ExistenceError } = require("./errors")
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

function validateUsername(username) {
  if (typeof username !== 'string') throw new TypeError('The username is not a string.')
  if (!username.trim().length) throw new ContentError('The username field is empty.')
  if (username.trim().length < 8) throw new RangeError('The username is too short.')
}

function validateEmail(email, explanation = 'email') {
  if (typeof email!=='string') throw new TypeError(`The ${explanation} is not a string.`)
  if (!email.trim().length) throw new ContentError(`The ${explanation} field is empty.`, {cause: 'hola'})
  if (!EMAIL_REGEX.test(email)) throw new ContentError('The email is not valid.')
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
    
    if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`The ${explanation} is not hexadecimal.`)
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
  if (token.split('.').length !== 3) throw new ContentError (`${explanation} is not valid.`)
}

function validateArray(array, explanation = 'array') {
  if (!Array.isArray(array)) throw new TypeError(`The ${explanation} is not an array.`)
}

function validateComment(comment, explanation = 'comment') {
  if (typeof comment !=='string') throw new TypeError(`The ${explanation} is not a string.`)
  if (!comment.trim().length) throw new ContentError(`The ${explanation} field is empty.`)
  if (comment.trim().length > 200) throw new ContentError(`The ${explanation} is too long.`)
}

function validateSuggestionTitle(title) {
  if (typeof title !=='string') throw new TypeError(`The suggestion title is not a string.`)
  if (!title.trim().length) throw new ContentError(`The suggestion title field is empty.`)
  if (title.length > 40) throw new ContentError('The suggestion title is too long.')
}

function validateSuggestionContent(content) {
  if (typeof content !=='string') throw new TypeError(`The suggestion content is not a string.`)
  if (!content.trim().length) throw new ContentError(`The suggestion content field is empty.`)
  if(content.length < 50) throw new ContentError('The suggestion content is too short.')
  if(content.length > 500) throw new ContentError('The suggestion content is too long.')
}

function validateUserInputObject(object) {
  if(typeof object !== 'object' || Array.isArray(object)) throw new TypeError(`The user input is not an object.`)
  if(!object.role || typeof object.role !== 'string') throw new ContentError('The "role" property in user input does not exist or is not a string.')
  if(object.role !== 'user') throw new ContentError('The input does not have a user role.')
  if(!object.content || typeof object.content !== 'string') throw new ContentError('The "content" property in user input does not exist or is not a string.')
}

function validateNewPostTitle(title) {
  if (typeof title !=='string') throw new TypeError(`The new post title is not a string.`)
  if (!title.trim().length) throw new ContentError(`The new post title field is empty.`)
  if(title.trim().length > 60) throw new RangeError('The title of the post is too long.')
}

function validateNewPostContent(content) {
  if (typeof content !=='string') throw new TypeError(`The new post content is not a string.`)
  if (!content.trim().length) throw new ContentError(`The new post content field is empty.`)
  if(content.trim().length < 600) throw new RangeError('The content of the post is too short.')
}

module.exports = {
  validateUsername,
  validateEmail,
  validatePassword,
  validateUrl,
  validateText,
  validateCallback,
  validateId,
  validateToken,
  validateArray,
  validateComment,
  validateSuggestionTitle,
  validateSuggestionContent,
  validateUserInputObject,
  validateNewPostTitle,
  validateNewPostContent
}