function validateName(name) {
  if (typeof name !== 'string') throw new Error('Name is not a string.')
  if (!name.trim().length) throw new Error('Name field is empty.')
}

function validateEmail(email, explanation = 'email') {
  if (typeof email!=='string') throw new Error(`The ${explanation} is not a string.`)
  if (!email.trim().length) throw new Error(`The ${explanation} field is empty.`, {cause: 'hola'})
}

function validatePassword(password, explanation = 'password') {
  if (typeof password!=='string') throw new Error(`The ${explanation} is not a string.`)
  if (!password.trim().length) throw new Error(`The ${explanation} field is empty.`)
}

function validateUrl(newUrl, explanation = 'url') {
  if (typeof newUrl !=='string') throw new Error(`The ${explanation} is not a string.`)
  if (!newUrl.trim().length) throw new Error(`The ${explanation} field is empty.`)

  const correctUrl = /(jpe?g|png|webp)/
  if (!correctUrl.test(newUrl)) throw new Error(`The url entered does not includes a .jpg/.jpg/.webp/.png extension.`)
}

function validateId(id, explanation = 'id') {
  // console.log(id)
  if (typeof id !=='string') throw new Error(`The ${explanation} is not a string.`)
  if (!id.trim().length) throw new Error(`The ${explanation} field is empty.`)
}

function validateText(text, explanation = 'text') {
  if (typeof text !=='string') throw new Error(`The ${explanation} is not a string.`)
  if (!text.trim().length) throw new Error(`The ${explanation} field is empty.`)
}

function validateCallback(callBack, explanation = 'CallBack')   {
  if (typeof callBack !== 'function') throw new Error(`${explanation} is not a function.`)
}

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateUrl,
  validateText,
  validateCallback,
  validateId
}