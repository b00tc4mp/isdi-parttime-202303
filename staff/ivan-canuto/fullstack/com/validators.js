function validateName(name) {
  if (!name.trim().length) throw new Error('Name field is empty.');
  if (typeof name !== 'string') throw new Error('Name is not a string.')
}

function validateEmail(email, explanation = 'email') {
  if (!email.trim().length) throw new Error(`The ${explanation} field is empty.`, {cause: 'hola'});
  if (typeof email!=='string') throw new Error(`The ${explanation} is not a string.`)
}

function validatePassword(password, explanation = 'password') {
  if (!password.trim().length) throw new Error(`The ${explanation} field is empty.`);
  if (typeof password!=='string') throw new Error(`The ${explanation} is not a string.`)
}

function validateUrl(newUrl, explanation = 'url') {
  if (!newUrl.trim().length) throw new Error(`The ${explanation} field is empty.`);
  if (typeof newUrl !=='string') throw new Error(`The ${explanation} is not a string.`)

  const correctUrl = /(jpe?g|png|webp)/;
  if (!correctUrl.test(newUrl)) throw new Error(`The url entered does not includes a .jpg/.jpg/.webp/.png extension.`)
}

function validateId(userId, explanation = 'id') {
  if (!userId.trim().length) throw new Error(`The ${explanation} is empty.`);
  if (typeof userId !=='string') throw new Error(`The ${explanation} is not a string.`)
}

function validateText(text, explanation = 'text') {
  if (!text.trim().length) throw new Error(`The ${explanation} field is empty.`);
  if (typeof text !=='string') throw new Error(`The ${explanation} is not a string.`)
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